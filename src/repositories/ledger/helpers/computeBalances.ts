import { transactions } from "@/src/repositories/ledger/transactions";
import { wallets } from "@/src/repositories/ledger/wallets";

interface IBalances {
  [address: string]: { amount: number };
}

export function computeBalances(accounts = wallets.map((v) => v.address)) {
  try {
    const balances: IBalances = {};

    // initialise balances to 0;
    accounts.forEach((address) => (balances[address] = { amount: 0 }));

    // update balances with transactions;
    transactions.forEach((tx) => {
      if (accounts.includes(tx.sender)) {
        balances[tx.sender].amount -= tx.amount;
      }
      if (accounts.includes(tx.recipient)) {
        balances[tx.recipient].amount += tx.amount;
      }
    });
    return balances;
  } catch (error) {
    console.log(error);
    return {};
  }
}
