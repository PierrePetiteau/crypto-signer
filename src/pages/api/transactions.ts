import { transactions } from "@/repositories/ledger/transactions";
import { Logger } from "@/src/helpers/logger";
import { ITransfer, processTransfer } from "@/src/repositories/ledger/helpers/processTransfer";
import { NextApiRequest, NextApiResponse } from "next";

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send(transactions);
  } catch (error) {
    console.log("getBalancesHandler", "error", error);
    res.status(400).send(error);
  }
};

const postTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { payload } = req.body;
  if (!payload || typeof payload !== "object" || !("transaction" in payload)) {
    res.status(400).send("Invalid payload");
    return;
  }

  const transfer: ITransfer = payload;
  const logger = new Logger();

  try {
    processTransfer({ transfer, logger });
    res.status(200).send({ history: logger.history });
  } catch (error) {
    console.log("postTransactions", "error", error);
    logger.error("Transaction failed!");
    res.status(200).send({ history: logger.history });
  }
};

const transactionsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getTransactions(req, res);
    }
    case "POST": {
      return postTransactions(req, res);
    }
    default: {
      res.status(405).send("Method Not Allowed");
    }
  }
};

export default transactionsHandler;
