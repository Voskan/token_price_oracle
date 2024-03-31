import { Request, Response } from "express";
import * as tokenPairService from "../../services/tokenService";

/**
 * Add a new token pair to the database.
 */
const addTokenPair = async (req: Request, res: Response) => {
  try {
    const { symbol, address, dataSource } = req.body;
    await tokenPairService.addTokenPair(symbol, address, dataSource);

    res
      .status(201)
      .json({ message: `Token pair ${symbol} added successfully.` });
  } catch (error) {
    throw error;
  }
};

/**
 * Update the address or data source of a token pair.
 */
const updateTokenPair = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const { address, dataSource } = req.body;
    await tokenPairService.updateTokenPair(symbol, address, dataSource);
    res.json({ message: `Pair ${symbol} updated successfully.` });
  } catch (error) {
    throw error;
  }
};

/**
 * Get all token pairs from the database.
 */
const getAllTokenPairs = async (req: Request, res: Response) => {
  try {
    const tokenPairs = await tokenPairService.getAllTokenPairs();
    res.json(tokenPairs);
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a token pair from the database.
 */
const deleteTokenPair = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    await tokenPairService.deleteTokenPair(symbol);
    res.json({ message: `Token pair ${symbol} deleted successfully.` });
  } catch (error) {
    throw error;
  }
};

export { addTokenPair, updateTokenPair, getAllTokenPairs, deleteTokenPair };
