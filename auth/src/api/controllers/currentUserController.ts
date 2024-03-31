import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/badRequestError";
import { NotAuthorizedError } from "../../errors/notAuthorizedError";

export const currentUser = async (req: Request, res: Response) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    throw new NotAuthorizedError();
  }

  const token = req.headers.authorization.split(" ")[1]; // Get the token from "Bearer token"

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    return res.json({ currentUser: payload });
  } catch (err) {
    throw err;
  }
};
