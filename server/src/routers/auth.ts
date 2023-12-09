import {
  create,
  generateForgetPasswordLink,
  grantValid,
  sendReVerificationToken,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import {
  CreateUserScheama,
  TokenAndIDValidation,
} from "#/utils/validationSchema";
import { verify } from "crypto";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserScheama), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  grantValid
);

export default router;
