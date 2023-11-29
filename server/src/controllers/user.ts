import { RequestHandler } from "express";

import { CreateUser } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import { sendVerificationMail } from "#/utils/mail";

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ name, email, password });

  // send verification email
  const token = generateToken(6);

  sendVerificationMail(token, { name, email, userId: user.id.toString() });

  res.status(201).json({ user: { id: user.id, name, email } });
};
