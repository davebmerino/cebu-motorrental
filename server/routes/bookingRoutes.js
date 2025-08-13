import express from "express";
import {
  createBooking,
  getUserBookings,
  getOwnerBookings,
  changeBookingStatus,
  checkAvailabilityOfMotor,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfMotor);
bookingRouter.post("/create-booking", protect, createBooking);
bookingRouter.get("/user-bookings", protect, getUserBookings);
bookingRouter.get("/owner-bookings", protect, getOwnerBookings);
bookingRouter.post("/change-booking-status", protect, changeBookingStatus);
bookingRouter.get("/all-user-bookings", protect, getAllBookings);

export default bookingRouter;
