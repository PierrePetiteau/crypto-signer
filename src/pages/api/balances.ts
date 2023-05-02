import { computeBalances } from "@/src/repositories/ledger/helpers/computeBalances";
import { NextApiRequest, NextApiResponse } from "next";

const getBalances = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const balances = computeBalances();

    res.status(200).send(balances);
  } catch (error) {
    console.log("getBalancesHandler", "error", error);
    res.status(400).send(error);
  }
};

const balancesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getBalances(req, res);
    }

    default: {
      res.status(405).send("Method Not Allowed");
    }
  }
};

export default balancesHandler;
