import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  addMoto,
  changeRoleToOwner,
  dashboardData,
  deleteMotor,
  listOwnedMotors,
  toggleMotorAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import upload from "../middlewares/multer.js";

const ownerRouter = express.Router();
ownerRouter.post("/change-role", protect, changeRoleToOwner);
// ownerRouter.post("/add-motor", upload.single("image"), protect, addMoto);
ownerRouter.post("/add-motor", protect, upload.single("image"), addMoto);
ownerRouter.post(
  "/update-image",
  protect,
  upload.single("image"),
  updateUserImage
);
ownerRouter.get("/list-motors", protect, listOwnedMotors);
ownerRouter.post("/toggle-motor", protect, toggleMotorAvailability);
ownerRouter.post("/delete-motor", protect, deleteMotor);

ownerRouter.get("/dashboard", protect, dashboardData);
ownerRouter.post("/update-image", protect, updateUserImage);

export default ownerRouter;
