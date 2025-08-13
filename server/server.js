import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Init express app
const app = express();

// Middleware - with CORS removed as requested
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));

// Database connection handling
let isConnected = false;

// Handle database connection before processing requests
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB Connected");
    }
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
});

// Register route handlers
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// Export for serverless environment
export default app;
