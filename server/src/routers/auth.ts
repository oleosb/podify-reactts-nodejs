import { create, sendReVerificationToken, verifyEmail } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserScheama,
  EmailVerificationBody,
} from "#/utils/validationSchema";
import { verify } from "crypto";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserScheama), create);
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);

export default router;
