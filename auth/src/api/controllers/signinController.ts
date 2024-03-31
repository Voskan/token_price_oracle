import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Password } from "../../services/password";
import { User } from "../../models/userModel";
import { BadRequestError } from "../../errors/badRequestError";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await Password.compare(user.password, password))) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    return res.json({ token });
  } catch (err) {
    throw err;
  }
};
