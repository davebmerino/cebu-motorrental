// index.js
import express from "express";
import mongoose from "mongoose";
// other imports

const app = express();

// Middleware
app.use(express.json());
// other middleware

// Routes
app.use("/api/owners", ownerRoutes);
// other routes

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for serverless
export default app;
