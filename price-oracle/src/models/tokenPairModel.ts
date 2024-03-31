import mongoose from "mongoose";

interface TokenPair {
  symbol: string;
  address: string;
  dataSource: string;
  price: number;
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
  price: {
    type: Number,
    default: 0,
  },
});

const TokenPairModel = mongoose.model<TokenPair>("TokenPair", tokenPairSchema);

export { TokenPairModel };
