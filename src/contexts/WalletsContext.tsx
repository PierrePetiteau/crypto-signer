import { fetchJson } from "@/helpers/api/fetch";
import createContext from "@/helpers/react/context";
import { IWallets } from "@/src/pages/api/wallets";
import { useCallback, useEffect, useState } from "react";

export async function getWallet(): Promise<IWallets> {
  return await fetchJson<IWallets>("/api/wallets");
}

interface WalletsContextParams {}

const WalletsContext = ({}: WalletsContextParams) => {
  const [wallets, setWallets] = useState<IWallets>();

  const onRefreshWallets = useCallback(async () => {
    const result = await getWallet();
    setWallets(result);
  }, []);

  useEffect(() => {
    onRefreshWallets();
  }, [onRefreshWallets]);

  return {
    wallets,
    onRefreshWallets,
  };
};

export const [WalletContextProvider, useWallets] = createContext(WalletsContext);
