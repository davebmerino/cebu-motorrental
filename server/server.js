import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

//init express app
const app = express();

console.log("Connecting to MongoDB...");
//connect database
await connectDB();
console.log("✅ MongoDB Connected");

//middelware
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

// app.get("/", (req, res) => res.send("Server is running"));
// app.use("/api/user", userRouter);
// app.use("/api/owner", ownerRouter);
// app.use("/api/booking", bookingRouter);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Routes
app.get("/", (req, res) => res.send("Server is running"));

// Connect to MongoDB first, then start the server
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB Connected");

    // Only set up routes after DB connection is established
    app.use("/api/user", userRouter);
    app.use("/api/owner", ownerRouter);
    app.use("/api/booking", bookingRouter);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
