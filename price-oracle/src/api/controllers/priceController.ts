import { Request, Response } from "express";
import {
  getAggregatedTokenPrice,
  saveTokenPrice,
} from "../../services/priceService";

/**
 * Returns the aggregated price for the specified token pair.
 */
const getAggregatedPrice = async (req: Request, res: Response) => {
  try {
    const { pair } = req.query;
    if (!pair) {
      return res
        .status(400)
        .json({ message: "Need to specify a token pair symbol." });
    }

    const price = await getAggregatedTokenPrice(pair as string);
    return res.json({ pair, price });
  } catch (error) {
    throw error;
  }
};

/**
 * Receives the price for the specified token pair and saves it to the database.
 */
const savePrice = async (req: Request, res: Response) => {
  try {
    const { symbol, price } = req.body;
    if (!symbol || !price) {
      return res
        .status(400)
        .json({ message: "Need to specify symbol and price." });
    }

    await saveTokenPrice(symbol, price);
    return res
      .status(201)
      .json({ message: `Price for ${symbol} saved successfully.` });
  } catch (error) {
    throw error;
  }
};

export { getAggregatedPrice, savePrice };
