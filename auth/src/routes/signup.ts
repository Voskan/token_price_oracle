import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { validateSignUp } from "../validate";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-errors";

const router = express.Router();

router.post(
  "/api/users/signup",
  validateSignUp,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    res.status(201).send("User registered successfully");
  }
);

export { router as signupRouter };
