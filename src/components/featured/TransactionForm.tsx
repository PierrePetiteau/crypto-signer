"use client";

import { Collapse } from "@/src/components/display/Collapse/Collapse";
import { Select } from "@/src/components/inputs/Select/Select";
import { TextInput } from "@/src/components/inputs/TextInput/TextInput";
import { ITransactionFields, useTransfer } from "@/src/contexts/TransferContext";
import { wallets } from "@/src/repositories/ledger/wallets";
import { Code } from "react-feather";
import { Form } from "react-final-form";

export const TransactionForm = () => {
  const { onBuildTransaction } = useTransfer();

  const walletOptions = wallets.map((v) => ({ title: v.pseudo }));

  async function onSubmit(fields: ITransactionFields) {
    try {
      onBuildTransaction(fields);
    } catch (error) {
      console.log("TransactionForm", "onSubmit", "error", error);
    }
  }

  return (
    <Collapse id="collapse_transaction_form" title="Step 1 - build the transaction" initialState="open">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col align-end">
              <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-3 gap-1">
                <Select id="sender" label={"Sender"} options={walletOptions} defaultValue={walletOptions[0].title} />
                <TextInput id="amount" placeholder="0" label={"Amount"} defaultValue="42" />
                <Select
                  id="recipient"
                  label={"Recipient"}
                  options={walletOptions}
                  defaultValue={walletOptions[1].title}
                />
              </div>

              <div className="p-2" />

              <button type="submit" className="btn btn-sm btn-outline btn-secondary self-end gap-2">
                Build <Code size="14px" />
              </button>
            </div>
          </form>
        )}
      />
    </Collapse>
  );
};
