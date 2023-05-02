import { Logger } from "@/src/helpers/logger";
import { computeBalances } from "@/src/repositories/ledger/helpers/computeBalances";
import { ITransaction, ITransactionRecord, transactions } from "@/src/repositories/ledger/transactions";
import { wallets } from "@/src/repositories/ledger/wallets";
import { Signature } from "@noble/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

function hashMessage(message: string) {
  return keccak256(utf8ToBytes(message));
}

export interface ITransfer {
  transaction: ITransaction;
  signatureCompact: string;
  recoveryBit: number;
}

export interface IProcessTransferParams {
  transfer: ITransfer;
  logger: Logger;
}

export function processTransfer({
  transfer: { transaction, signatureCompact, recoveryBit },
  logger,
}: IProcessTransferParams) {
  logger.info("Server side - process transfer");
  logger.code("processTransfer({ transaction, signatureCompact, recoveryBit });");
  logger.debug("const transaction = " + JSON.stringify(transaction, null, " "));
  logger.debug("const signatureCompact = " + signatureCompact);
  logger.debug("const recoveryBit = " + recoveryBit);

  logger.info("Recover signature using signatureCompact and recoveryBit");
  logger.code("const signature = Signature.fromCompact(signatureCompact).addRecoveryBit(recoveryBit);");
  const signature = Signature.fromCompact(signatureCompact).addRecoveryBit(recoveryBit);

  logger.info("Generate the transaction hash");
  logger.code("const transactionHash = keccak256(utf8ToBytes(transaction))");
  const transactionHash = hashMessage(JSON.stringify(transaction));
  logger.debug("const transactionHash = " + toHex(transactionHash));

  logger.info("Recover the public key from the signature using the transaction hash");
  logger.code("const publicKey = signature.recoverPublicKey(transactionHash);");
  const publicKey = signature.recoverPublicKey(transactionHash);
  logger.debug("const publicKey = " + publicKey.toHex());

  logger.info("Compute the account address from the public key");
  logger.code("const address = toHex(keccak256(publicKey.toRawBytes()).slice(-20));");
  const address = toHex(keccak256(publicKey.toRawBytes()).slice(-20));
  logger.debug("const address = " + address);

  logger.info("Verify the signature validity using message hash and public key");
  logger.code("const isSignatureValid = secp256k1.verify(signature, transactionHash, publicKey.toHex());");
  const isSignatureValid = secp256k1.verify(signature, transactionHash, publicKey.toHex());
  if (!isSignatureValid) {
    logger.error("const isSignatureValid = " + isSignatureValid);
    throw Error("Invalid signature!");
  }
  logger.success("const isSignatureValid = " + isSignatureValid);

  logger.info("Verify if the sender of the transaction match the signer address");
  logger.code("const isSenderMatchSigner = transaction.sender === address;");
  logger.debug(`const isSenderMatchSigner = ${transaction.sender} === ${address};`);
  const isSenderMatchSigner = transaction.sender === address;
  if (!isSenderMatchSigner) {
    logger.error("const isSenderMatchSigner = " + isSenderMatchSigner);
    throw Error("Invalid sender!");
  }
  logger.success("const isSenderMatchSigner = " + isSenderMatchSigner);

  const isRecipientKnown = Boolean(wallets.find((v) => v.address === transaction.recipient));
  if (!isRecipientKnown) {
    logger.info("Verify if the recipient is known (for simplicity only satoshi, alice and bob are authorized)");
    logger.error("const isRecipientKnown = " + isRecipientKnown);
    throw Error("Invalid recipient!");
  }

  const { sender, amount } = transaction;
  const isAmountValid = amount >= 0;
  if (!isAmountValid) {
    logger.info("Check if amount is valid");
    logger.code("const isAmountValid = amount >= 0;");
    logger.debug(`const isAmountValid = ${amount} >= 0;`);
    logger.error("const isAmountValid = " + isAmountValid);
    throw Error("Not enough funds!");
  }

  logger.info("Compute sender balance");
  logger.code("const balances = computeBalances([sender]);");
  const balances = computeBalances([sender]);
  logger.debug("balances " + JSON.stringify(balances, null, " "));

  logger.info("Check if sender has enough funds");
  logger.code("const isSenderHasEnoughFunds = balances[sender] && balances[sender].amount >= amount;");
  logger.debug(
    `const isSenderHasEnoughFunds = ${Boolean(balances[sender])} && ${balances[sender].amount} >= ${amount};`
  );
  const isSenderHasEnoughFunds = balances[sender] && balances[sender].amount >= amount;

  if (!isSenderHasEnoughFunds) {
    logger.error("const isSenderHasEnoughFunds = " + isSenderHasEnoughFunds);
    throw Error("Not enough funds!");
  } else {
    logger.success("isSenderHasEnoughFunds " + isSenderHasEnoughFunds);

    logger.info("Add transaction to history");
    logger.code("const transactionItem = { ...transaction, timestamp: Date.now() };");
    const transactionItem: ITransactionRecord = { ...transaction, timestamp: Date.now() };
    logger.debug("const transactionItem = " + JSON.stringify(transactionItem, null, " "));
    logger.code("transactions.push(transactionItem);");
    transactions.push(transactionItem);
    logger.success("Transaction succeed!");
  }
}
