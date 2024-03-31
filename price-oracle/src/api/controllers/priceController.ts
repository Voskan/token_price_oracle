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
    const { symbol } = req.params;
    if (!symbol) {
      return res
        .status(400)
        .json({ message: "Need to specify a token pair symbol." });
    }

    const price = await getAggregatedTokenPrice(symbol);
    return res.json({ symbol, price });
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
