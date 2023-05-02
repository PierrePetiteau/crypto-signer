import { wallets } from "@/src/repositories/ledger/wallets";

export interface ITransaction {
  sender: string;
  amount: number;
  recipient: string;
}

export interface ITransactionRecord extends ITransaction {
  timestamp: number;
}

const initialsTransactions: ITransactionRecord[] = [
  {
    timestamp: 1231002905,
    sender: "0x0000000000000000000000000000000000000000",
    amount: 21000000,
    recipient: wallets[0].address,
  },
  {
    timestamp: 1231002905,
    sender: "0x0000000000000000000000000000000000000000",
    amount: 2048,
    recipient: wallets[1].address,
  },
  {
    timestamp: 1231002905,
    sender: "0x0000000000000000000000000000000000000000",
    amount: 1010,
    recipient: wallets[2].address,
  },
];

export const transactions: ITransactionRecord[] = [...initialsTransactions];
