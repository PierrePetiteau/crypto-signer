import { wallets } from "@/src/repositories/ledger/wallets";

export function getWalletByAddress(address: string) {
  return wallets.find((v) => v.address === address);
}
