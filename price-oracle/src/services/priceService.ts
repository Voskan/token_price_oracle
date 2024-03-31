import { TokenPairModel } from "../models/tokenPairModel";
import { getTokenPrices } from "../dataSources";
import { aggregatePriceData } from "../utils/aggregator";

/**
 * Get the aggregated price for a token pair.
 * @param symbol Symbol of the token pair.
 * @returns {Promise<number>} Aggregated price of the token pair.
 */
const getAggregatedTokenPrice = async (symbol: string): Promise<number> => {
  try {
    const tokenPair = await TokenPairModel.findOne({ symbol }).exec();
    if (!tokenPair) {
      throw new Error(`Пара токенов ${symbol} не найдена.`);
    }

    const prices = await getTokenPrices(); // { dexPrice: number, cexPrice: number }
    const aggregatedPrice = aggregatePriceData([
      { price: prices.dexPrice, volume: 1000 }, // Example volume
      { price: prices.cexPrice, volume: 1000 }, // Example volume
    ]);

    return aggregatedPrice;
  } catch (error) {
    console.error(`Error getting aggregated price for ${symbol}:`, error);
    throw error;
  }
};

/**
 * Save the price for a token pair.
 * @param symbol Symbol of the token pair.
 * @param price Price of the token pair.
 * @returns {Promise<void>}
 */
const saveTokenPrice = async (symbol: string, price: number): Promise<void> => {
  try {
    await TokenPairModel.updateOne(
      { symbol },
      { $set: { lastPrice: price } },
      { upsert: true }
    ).exec();
    console.log(`Price for ${symbol} saved successfully.`);
  } catch (error) {
    console.error(`Error saving price for ${symbol}:`, error);
    throw error;
  }
};

export { getAggregatedTokenPrice, saveTokenPrice };
