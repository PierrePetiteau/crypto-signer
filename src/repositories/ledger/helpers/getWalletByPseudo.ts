import { wallets } from "@/src/repositories/ledger/wallets";

export function getWalletByPseudo(pseudo: string) {
  return wallets.find((v) => v.pseudo === pseudo);
}
