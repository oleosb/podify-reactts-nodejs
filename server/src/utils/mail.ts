import nodemailer from "nodemailer";
import path from "path";

import EmailVerificationToken from "models/emailVerificationToken";
import {
  MAILTRAP_PASSWORD,
  MAILTRAP_USER,
  VERIFICATION_EMAIL,
} from "#/utils/variables";
import { generateToken } from "#/utils/helper";
import { generateTemplate } from "#/mail/template";

const generateMailTransporter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    },
  });
};

interface Profile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransporter();

  const { name, email, userId } = profile;

  await EmailVerificationToken.create({
    owner: userId,
    token,
  });

  const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your email.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: " Welcome",
    html: generateTemplate({
      title: "Welcome to Podify",
      message: welcomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  });
};
