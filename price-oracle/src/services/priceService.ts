import { TokenPairModel } from "../models/tokenPairModel";
import { getTokenPrices } from "../dataSources";
import { aggregatePriceData } from "../utils/aggregator";
import { NotFoundError } from "../errors/notFoundError";
import cache from "../utils/cache";

/**
 * Get the aggregated price for a token pair.
 * @param symbol Symbol of the token pair.
 * @returns {Promise<number>} Aggregated price of the token pair.
 */
const getAggregatedTokenPrice = async (symbol: string): Promise<number> => {
  try {
    const tokenPair = await TokenPairModel.findOne({ symbol }).exec();
    if (!tokenPair) {
      throw new NotFoundError(`Token pair ${symbol} not found.`);
    }

    if (await cache.get(symbol)) {
      return Promise.resolve(parseFloat((await cache.get(symbol)) as string));
    }

    const prices = await getTokenPrices(tokenPair.address, tokenPair.symbol);
    const aggregatedPrice = aggregatePriceData([
      { price: prices.dexPrice, volume: 1000 }, // Example volume
      { price: prices.cexPrice, volume: 1000 },
    ]);

    cache.set(symbol, aggregatedPrice.toString(), 120); // Cache for 120 seconds

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
