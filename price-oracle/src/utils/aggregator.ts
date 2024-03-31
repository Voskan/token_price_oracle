import { RedisError } from "../errors/redisError";

interface PriceData {
  price: number;
  volume: number;
}

/**
 * Calculates the weighted average price from an array of price and volume objects.
 * @param prices Array of price and volume objects.
 * @returns Weighted average price.
 */
const calculateWeightedAveragePrice = (prices: PriceData[]): number => {
  let weightedPriceSum = 0;
  let totalVolume = 0;

  for (const data of prices) {
    weightedPriceSum += data.price * data.volume;
    totalVolume += data.volume;
  }

  if (totalVolume === 0) {
    throw new RedisError("Total volume is zero");
  }

  return weightedPriceSum / totalVolume;
};

/**
 * Aggregates price data from different sources.
 * @param priceSources Array of price data from different sources.
 * @returns Aggregated price.
 */
const aggregatePriceData = (priceSources: PriceData[]): number => {
  try {
    const weightedAveragePrice = calculateWeightedAveragePrice(priceSources);
    return weightedAveragePrice;
  } catch (error) {
    console.error("Error aggregating price data: ", error);
    throw error;
  }
};

export { aggregatePriceData, calculateWeightedAveragePrice };
