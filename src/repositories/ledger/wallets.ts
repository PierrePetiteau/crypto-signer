import { generateWallet } from "@/src/repositories/ledger/helpers/generateWallet";

export interface IWallet {
  pseudo: string;
  private_key: string;
  public_key: string;
  address: string; // ethereum address format
}

export const wallets: IWallet[] = [
  generateWallet({
    pseudo: "satoshi",
    privateKey: "299bb9d0cb3bfc10806f8400f798dae96f712d5c2430afa4db24b61626e58de3",
  }),
  generateWallet({
    pseudo: "alice",
    privateKey: "e87abbd4dd5bb6ef00b4cdf97caabca85a72eaf49911dda0e28a8d273c97649f",
  }),
  generateWallet({
    pseudo: "bob",
    privateKey: "7bab7ff21c8a3c001d1fcb8a2ba94580f1ac501fff527ebbede74131673af2af",
  }),
];
