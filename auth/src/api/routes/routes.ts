import express from "express";
import { validateSignUp } from "../../validate";
import { signUp } from "../controllers/signupController";
import { currentUser } from "../controllers/currentUserController";
import { signIn } from "../controllers/signinController";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/signup", validateSignUp, validateRequest, signUp);

router.get("/currentuser", currentUser);

router.post("/signin", validateSignUp, validateRequest, signIn);

export { router };
