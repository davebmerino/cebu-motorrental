// app.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // For testing - update this after successful deployment
    credentials: true,
  })
);

// Simple health check route
app.get("/", (req, res) => {
  res.status(200).send("Cebu MotorRental API is running");
});

// MongoDB connection (cached for serverless)
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
    const client = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = client;
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Middleware wrapper
const withDb = (handler) => {
  return async (req, res, next) => {
    try {
      await connectToDatabase();
      return handler(req, res, next);
    } catch (error) {
      console.error("Error in withDb middleware:", error);
      return res.status(500).json({
        error: "Database connection failed",
        message: error.message,
      });
    }
  };
};

// Routes
app.use(
  "/api/user",
  withDb((req, res, next) => userRouter(req, res, next))
);
app.use(
  "/api/owner",
  withDb((req, res, next) => ownerRouter(req, res, next))
);
app.use(
  "/api/booking",
  withDb((req, res, next) => bookingRouter(req, res, next))
);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production" ? "Server error" : err.message,
  });
});

export default app;
