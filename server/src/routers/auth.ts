import { Router } from "express";
import User from "models/user";

const router = Router();

router.post("/create", async (req, res) => {
  const { email, password, name } = req.body;
  // const user = new User({ email, password, name });
  // user.save();
  const user = await User.create({ name, email, password });
  res.json({ user });
});

export default router;
