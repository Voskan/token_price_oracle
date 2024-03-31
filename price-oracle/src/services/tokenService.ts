import { Request, Response } from "express";
import { TokenPairModel } from "../models/tokenPairModel";
import { NotFoundError } from "../errors/notFoundError";

/**
 * Add a new token pair to the database.
 * @param symbol Symbol of the token pair.
 * @param address Address of the token pair.
 * @param dataSource Data source of the token pair.
 */
const addTokenPair = async (
  symbol: string,
  address: string,
  dataSource: string
): Promise<void> => {
  const newTokenPair = new TokenPairModel({
    symbol,
    address,
    dataSource,
  });

  try {
    await newTokenPair.save();
    console.log(`Token pair ${symbol} added successfully.`);
  } catch (error) {
    console.error(`Error adding token pair ${symbol}:`, error);
    throw error;
  }
};

/**
 * Update the address or data source of a token pair.
 * @param symbol Symbol of the token pair.
 * @param address New address for the pair.
 * @param dataSource New data source for the pair.
 */
const updateTokenPair = async (
  symbol: string,
  address?: string,
  dataSource?: string
): Promise<void> => {
  try {
    const updateData = {} as any;
    if (address) updateData.address = address;
    if (dataSource) updateData.dataSource = dataSource;

    const result = await TokenPairModel.updateOne(
      { symbol },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Token pair ${symbol} not found.`);
    }

    console.log(`Token pair ${symbol} updated successfully.`);
  } catch (error) {
    throw error;
  }
};

/**
 * Get all token pairs from the database.
 */
const getAllTokenPairs = async (): Promise<any[]> => {
  try {
    const tokenPairs = await TokenPairModel.find({});
    return tokenPairs;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a token pair from the database.
 * @param symbol Symbol of the token pair.
 */
const deleteTokenPair = async (symbol: string): Promise<void> => {
  try {
    const result = await TokenPairModel.deleteOne({ symbol });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Token pair ${symbol} not found.`);
    }

    console.log(`Token pair ${symbol} deleted successfully.`);
  } catch (error) {
    throw error;
  }
};

export { addTokenPair, updateTokenPair, getAllTokenPairs, deleteTokenPair };
