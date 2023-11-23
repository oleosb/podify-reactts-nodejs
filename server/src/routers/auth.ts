import { create } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import { CreateUserScheama } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserScheama),
create);

export default router;
