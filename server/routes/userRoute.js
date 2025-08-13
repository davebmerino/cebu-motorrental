import express from "express";
import {
  getMotorCycleById,
  getMotorCycles,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

import { protect } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/motorcycles", getMotorCycles);
userRouter.get("/motorcycle/:id", getMotorCycleById);

export default userRouter;
