import { computeBalances } from "@/src/repositories/ledger/helpers/computeBalances";
import { IWallet, wallets } from "@/src/repositories/ledger/wallets";
import { NextApiRequest, NextApiResponse } from "next";

interface IWalletExtended extends IWallet {
  balance: number;
}
export type IWallets = IWalletExtended[];

const getWallets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const walletList: IWalletExtended[] = wallets.map((v) => {
      return { ...v, balance: computeBalances([v.address])[v.address].amount };
    });
    res.status(200).send(walletList);
  } catch (error) {
    console.log("getWalletsHandler", "error", error);
    res.status(400).send(error);
  }
};

const walletsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getWallets(req, res);
    }

    default: {
      res.status(405).send("Method Not Allowed");
    }
  }
};

export default walletsHandler;
