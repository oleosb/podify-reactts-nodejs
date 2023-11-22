import { CreateUser } from "#/@types/user";
import { validate } from "#/middleware/validator";
import { CreateUserScheama } from "#/utils/validationSchema";
import { Router } from "express";
import User from "models/user";

const router = Router();

router.post(
  "/create",
  validate(CreateUserScheama),
  async (req: CreateUser, res) => {
    const { email, password, name } = req.body;
    CreateUserScheama.validate(name, email, password).catch((error) => {});

    // const user = new User({ email, password, name });
    // user.save();
    const user = await User.create({ name, email, password });
    res.json({ user });
  }
);

export default router;
