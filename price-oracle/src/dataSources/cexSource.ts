import https from "https";

/**
 * Get token price from CEX.
 * @returns {Promise<number>} Token price.
 */
const getTokenPriceFromCEX = (symbol: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    https
      .get(
        process.env.BINANCE_API_URL + "/ticker/price?symbol=" + symbol,
        (res) => {
          let data = "";

          // Listener for the 'data' event, which is triggered when a chunk of data is received
          res.on("data", (chunk) => {
            data += chunk;
          });

          // Listener for the 'end' event, which is triggered when all data has been received
          res.on("end", () => {
            try {
              const parsedData = JSON.parse(data);
              const price = parseFloat(parsedData.price);
              if (!isNaN(price)) {
                resolve(price);
              } else {
                reject(new Error("No price data found in response."));
              }
            } catch (error) {
              reject(new Error("Error parsing response data."));
            }
          });
        }
      )
      .on("error", (error) => {
        reject(
          new Error(`Error getting token price from CEX: ${error.message}`)
        );
      });
  });
};

export { getTokenPriceFromCEX };
