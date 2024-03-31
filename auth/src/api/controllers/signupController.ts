import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../../models/userModel";
import { BadRequestError } from "../../errors/badRequestError";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    return res.status(201).json({ token: userJwt });
  } catch (err) {
    throw err;
  }
};
