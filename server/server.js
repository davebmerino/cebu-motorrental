import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

//init express app
const app = express();

//middleware
app.use(
  cors()
  //   {
  //   origin:
  //     process.env.NODE_ENV === "production"
  //       ? process.env.FRONTEND_URL
  //       : ["http://127.0.0.1:5173"],
  //   credentials: true,
  // }
);
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// Connect to MongoDB when the app initializes
let isConnected = false;

// Only connect once
const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Handle requests after connecting to database
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for serverless environment
export default app;
