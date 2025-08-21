// server.js
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

// Simple health check route that doesn't depend on MongoDB
app.get("/", (req, res) => {
  res.status(200).send("Cebu MotorRental API is running");
});

// Connect to MongoDB - optimized for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection, create a new one
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

// Wrap route handlers to ensure DB connection
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

// Apply database connection to API routes
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production" ? "Server error" : err.message,
  });
});

// Start server for local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    });
}

// Export the app for Vercel
export default app;
