import { create, verifyEmail } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import { CreateUserScheama } from "#/utils/validationSchema";
import { verify } from "crypto";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserScheama),
create);
router.post("/verify-email", verifyEmail);

export default router;
