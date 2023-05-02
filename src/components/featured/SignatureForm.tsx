import { Collapse } from "@/src/components/display/Collapse/Collapse";
import { Select } from "@/src/components/inputs/Select/Select";
import { Textarea } from "@/src/components/inputs/Textarea/Textarea";
import { ISignatureFields, useTransfer } from "@/src/contexts/TransferContext";
import { getWalletByPseudo } from "@/src/repositories/ledger/helpers/getWalletByPseudo";
import { wallets } from "@/src/repositories/ledger/wallets";
import { Key } from "react-feather";
import { Form } from "react-final-form";

export const SignatureForm = () => {
  const { onSignTransaction, initialSignature } = useTransfer();
  const walletOptions = wallets.map((v) => ({ title: v.pseudo }));
  const defaultSender = getWalletByPseudo(initialSignature?.signer ?? "")?.pseudo;

  async function onSubmit(fields: ISignatureFields) {
    try {
      onSignTransaction(fields);
    } catch (error) {
      console.log("SignatureForm", "onSubmit", "error", error);
    }
  }

  return (
    <Collapse id={"collapse_signature_form"} title="Step 2 - sign the transaction" initialState="close">
      <Form
        onSubmit={onSubmit}
        initialValues={initialSignature}
        render={({ handleSubmit }) => (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col align-end">
              <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-3 gap-1">
                <Select id="signer" label={"Signer"} options={walletOptions} defaultValue={defaultSender} />
                <div className="col-span-2">
                  <Textarea id="transaction" placeholder="{}" label={"Transaction"} defaultValue="{}" />
                </div>
              </div>

              <div className="p-2" />

              <button type="submit" className="btn btn-sm btn-outline btn-secondary self-end gap-2">
                Sign <Key size="14px" />
              </button>
            </div>
          </form>
        )}
      />
    </Collapse>
  );
};
