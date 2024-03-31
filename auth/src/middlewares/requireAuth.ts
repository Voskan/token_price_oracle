import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/notAuthorizedError";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    throw new NotAuthorizedError();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    req.currentUser = payload;
  } catch (err) {
    throw err;
  }

  next();
};
