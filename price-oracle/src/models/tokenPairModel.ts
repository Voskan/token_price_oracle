import mongoose from "mongoose";

interface TokenPair {
  symbol: string;
  address: string;
  dataSource: string;
}

const tokenPairSchema = new mongoose.Schema<TokenPair>({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  dataSource: {
    type: String,
    required: true,
  },
});

const TokenPairModel = mongoose.model<TokenPair>("TokenPair", tokenPairSchema);

export { TokenPairModel };
