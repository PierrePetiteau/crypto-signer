import { capitalize } from "@/helpers/text/text";
import { Collapse } from "@/src/components/display/Collapse/Collapse";
import { useBalances } from "@/src/contexts/BalancesContext";
import { wallets } from "@/src/repositories/ledger/wallets";
import { RefreshCw } from "react-feather";

const formatSensibleHexKey = (input: string) => {
  const output = "0x" + input.slice(0, 4) + "..." + input.slice(-4);
  return output;
};

export const BalancesSection = () => {
  const { balances, onRefreshBalances } = useBalances();

  return (
    <Collapse id="collapse_balances_section" title="Balances" initialState="open">
      <>
        <div className="overflow-x-scroll">
          <table className="table-auto border border-gray-600">
            <thead>
              <tr>
                <th className="px-4 py-2">Pseudo</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Public key</th>
                <th className="px-4 py-2">Private key</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((v) => {
                return (
                  <tr key={v.address}>
                    <td className="border border-gray-600 px-4 py-2">{capitalize(v.pseudo)}</td>
                    <td className="border border-gray-600 px-4 py-2">{balances ? balances[v.address].amount : 0}</td>
                    <td className="border border-gray-600 px-4 py-2">{formatSensibleHexKey(v.address)}</td>
                    <td className="border border-gray-600 px-4 py-2">{formatSensibleHexKey(v.public_key)}</td>
                    <td className="border border-gray-600 px-4 py-2">{formatSensibleHexKey(v.private_key)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pt-2 w-full flex justify-end">
          <button className="btn btn-sm btn-outline btn-secondary self-end gap-2" onClick={() => onRefreshBalances()}>
            Refresh <RefreshCw size="14px" />
          </button>
        </div>
      </>
    </Collapse>
  );
};
