import { fetchJson } from "@/helpers/api/fetch";
import { checkCheckboxInput } from "@/helpers/dom/input";
import { scrollToElement } from "@/helpers/dom/scroll";
import createContext from "@/helpers/react/context";
import { useBalances } from "@/src/contexts/BalancesContext";
import { ILog, Logger } from "@/src/helpers/log/logger";
import { getWalletByPseudo } from "@/src/repositories/ledger/helpers/getWalletByPseudo";
import { ITransfer } from "@/src/repositories/ledger/helpers/processTransfer";
import { ITransaction } from "@/src/repositories/ledger/transactions";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { useCallback, useState } from "react";

async function submitTransfer(payload: ITransfer) {
  try {
    return await fetchJson<{ history: ILog[] }>("/api/transactions", {
      method: "POST",
      body: { payload },
    });
  } catch (error) {
    console.log("submitTransfer", "error", error);
  }
}

export interface ITransactionFields {
  sender: string;
  amount: string;
  recipient: string;
}

export interface ISignatureFields {
  signer: string;
  transaction: string;
}

interface TransferContextParams {}

const TransferContext = ({}: TransferContextParams) => {
  const { onRefreshBalances } = useBalances();
  const [initialSignature, setInitialSignature] = useState<ISignatureFields>();
  const [logs, setLogs] = useState<ILog[]>([]);

  const initializeSignatureFieldsFromTransactionFields = useCallback((fields: ITransactionFields) => {
    const senderWallet = getWalletByPseudo(fields.sender);
    const recipientAddress = getWalletByPseudo(fields.recipient)?.address;

    if (!senderWallet || !recipientAddress) {
      throw Error("Address unknown");
    }

    const tx = {
      sender: senderWallet.address,
      amount: parseInt(fields.amount),
      recipient: recipientAddress,
    };

    setInitialSignature({
      signer: fields.sender,
      transaction: JSON.stringify(tx, null, "\t"),
    });
  }, []);

  const onBuildTransaction = useCallback(
    (fields: ITransactionFields) => {
      initializeSignatureFieldsFromTransactionFields(fields);
      checkCheckboxInput("collapse_signature_form");
      scrollToElement("collapse_signature_form");
    },
    [initializeSignatureFieldsFromTransactionFields]
  );

  const onSignTransaction = useCallback(
    async (fields: ISignatureFields) => {
      const logger = new Logger();

      logger.info("Client side - Generate transaction signature");
      const transaction = JSON.parse(fields.transaction) as ITransaction;
      const senderWallet = getWalletByPseudo(fields.signer);
      const recipientAddress = transaction.recipient;

      if (!senderWallet || !recipientAddress) {
        throw Error("Address unknown");
      }

      logger.code("const message = JSON.stringify(transaction);");
      const message = JSON.stringify(transaction);
      logger.debug("const message = " + message);

      logger.code("const hashedMessage = keccak256(utf8ToBytes(message));");
      const hashedMessage = keccak256(utf8ToBytes(message));
      logger.debug("const hashedMessage = " + toHex(hashedMessage));

      logger.code("const signature = secp256k1.sign(hashedMessage, senderWallet.private_key);");
      const signature = secp256k1.sign(hashedMessage, senderWallet.private_key);

      logger.code("const signatureCompact = signature.toCompactHex();");
      logger.code("const recoveryBit = signature.recovery;");
      const signatureCompact = signature.toCompactHex();
      const recoveryBit = signature.recovery;
      logger.debug("const signatureCompact = " + signatureCompact);
      logger.debug("const recoveryBit = " + recoveryBit);

      if (recoveryBit === undefined) {
        throw Error("Recovery unavailable on signature");
      }

      logger.info("Call backend to process the transaction");
      logger.code("const transfer = await submitTransfer({ transaction, signatureCompact, recoveryBit });");

      const transfer = await submitTransfer({ transaction, signatureCompact, recoveryBit });
      transfer && logger.merge(transfer.history);

      setLogs(logger.history);
      onRefreshBalances();
      checkCheckboxInput("collapse_logs_section");
      scrollToElement("collapse_logs_section");
    },
    [onRefreshBalances]
  );

  return {
    initialSignature,
    logs,
    onBuildTransaction,
    onSignTransaction,
  };
};

export const [TransferContextProvider, useTransfer] = createContext(TransferContext);
