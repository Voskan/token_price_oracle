import express from "express";
import { getAggregatedPrice, savePrice } from "../controllers/priceController";
import {
  addTokenPair,
  updateTokenPair,
  getAllTokenPairs,
  deleteTokenPair,
} from "../controllers/tokenController";

const router = express.Router();

router.post("/token-pairs", addTokenPair);

router.put("/token-pairs/:symbol", updateTokenPair);

router.get("/token-pairs", getAllTokenPairs);

router.delete("/token-pairs/:symbol", deleteTokenPair);

router.get("/:symbol", getAggregatedPrice);

router.post("/", savePrice);

export { router };
