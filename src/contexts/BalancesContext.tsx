import { fetchJson } from "@/helpers/api/fetch";
import createContext from "@/helpers/react/context";
import { useCallback, useEffect, useState } from "react";

export interface IBalances {
  [address: string]: { amount: number };
}

export async function getBalances(): Promise<IBalances> {
  return await fetchJson<IBalances>("/api/balances");
}

interface BalancesContextParams {}

const BalancesContext = ({}: BalancesContextParams) => {
  const [balances, setBalances] = useState<IBalances>();

  const onRefreshBalances = useCallback(async () => {
    const result = await getBalances();
    setBalances(result);
  }, []);

  useEffect(() => {
    onRefreshBalances();
  }, [onRefreshBalances]);

  return {
    balances,
    onRefreshBalances,
  };
};

export const [BalancesContextProvider, useBalances] = createContext(BalancesContext);
