import express from "express";
import { getAggregatedPrice, savePrice } from "../controllers/priceController";
import {
  addTokenPair,
  updateTokenPair,
  getAllTokenPairs,
  deleteTokenPair,
} from "../controllers/tokenController";
import { requireAuth } from "../../middlewares/validateAuth";

const router = express.Router();

router.post("/token-pairs", requireAuth, addTokenPair);

router.put("/token-pairs/:symbol", requireAuth, updateTokenPair);

router.get("/token-pairs", requireAuth, getAllTokenPairs);

router.delete("/token-pairs/:symbol", requireAuth, deleteTokenPair);

router.get("/symbol", requireAuth, getAggregatedPrice);

router.post("/", requireAuth, savePrice);

export { router };
