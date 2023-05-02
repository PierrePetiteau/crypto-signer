import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export function hashMessage(message: string) {
  const messageBytes = utf8ToBytes(message);
  const messageHash = keccak256(messageBytes);
  return messageHash;
}

export function signMessage(msg: string, privateKey: string) {
  const msgHash = hashMessage(msg);
  const signature = secp256k1.sign(msgHash, privateKey);
  return signature;
}
