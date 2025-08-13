import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Init express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));

// Database connection handling - lazy connection pattern
let isConnected = false;
const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB Connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error; // Re-throw to be handled by the request handler
    }
  }
};

// Connect to DB before handling routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    return res.status(500).json({ error: "Database connection failed" });
  }
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// Export the Express application
export default app;
