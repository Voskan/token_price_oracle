import { ethers } from "ethers";
import { NotFoundError } from "../errors/notFoundError";

// ABI interface for Uniswap V2 Pair.
const UNISWAP_PAIR_ABI = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
];

/**
 * Get the price of a token from a DEX.
 * @returns {Promise<number>} Token price.
 */
const getTokenPriceFromDEX = async (address: string): Promise<number> => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL + "/1b9");
    const uniswapPairContract = new ethers.Contract(
      address,
      UNISWAP_PAIR_ABI,
      provider
    );

    const reserves = await uniswapPairContract.getReserves();
    // Price of token1 in terms of token0.
    const price = reserves.reserve1 / reserves.reserve0; // this is the line that needs to be changed

    return price;
  } catch (error) {
    console.error("Error getting token price from DEX:", error);
    throw new NotFoundError("Token price not found");
  }
};

export { getTokenPriceFromDEX };
