import { getTokenPriceFromDEX } from "./dexSource";
import { getTokenPriceFromCEX } from "./cexSource";

/**
 * Get token prices from DEX and CEX.
 * @returns {Promise<{dexPrice: number, cexPrice: number}>}
 */
const getTokenPrices = async (): Promise<{
  dexPrice: number;
  cexPrice: number;
}> => {
  try {
    const dexPrice = await getTokenPriceFromDEX();
    const cexPrice = await getTokenPriceFromCEX();
    return { dexPrice, cexPrice };
  } catch (error) {
    console.error("Error getting token prices:", error);
    throw error;
  }
};

export { getTokenPrices };
