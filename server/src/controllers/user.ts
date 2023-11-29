import { RequestHandler } from "express";

import { CreateUser, VerifyEmailRequest } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { sendVerificationMail } from "#/utils/mail";

export const verifyEmail: RequestHandler = async (
  req: VerifyEmailRequest,
  res
) => {
  const { token, userId } = req.body;

  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!verificationToken)
    return res.status(403).json({ error: "Invalid token!" });

  const matched = await verificationToken.compareToken(token);
  if (!matched) return res.status(403).json({ error: "Invalid token!" });

  await User.findByIdAndUpdate(userId, { verified: true });

  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: "Your email is verified" });
};

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ name, email, password });

  // send verification email
  const token = generateToken(6);

  sendVerificationMail(token, { name, email, userId: user.id.toString() });

  res.status(201).json({ user: { id: user.id, name, email } });
};
