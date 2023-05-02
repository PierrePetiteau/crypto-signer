import { IWallet } from "@/src/repositories/ledger/wallets";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

interface GenerateWalletParams {
  privateKey: string;
  pseudo: string;
}

export function generateWallet({ privateKey, pseudo }: GenerateWalletParams) {
  const publicKey = secp256k1.getPublicKey(privateKey);

  const wallet: IWallet = {
    pseudo,
    private_key: privateKey,
    public_key: toHex(publicKey),
    address: toHex(keccak256(publicKey).slice(-20)),
  };

  return wallet;
}
