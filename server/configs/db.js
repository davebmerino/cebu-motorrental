import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongoose.connection.on("Connected", () =>
    //   console.log("Database Connected")
    // );

    mongoose.set("strictQuery", false);

    // Connection options with increased timeouts
    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    // await mongoose.connect(`${process.env.MONGODB_URI}/moto_rental`);
    // console.log("✅ MongoDB Connected");

    // Connect with explicit promise handling
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    return conn;
  } catch (error) {
    // console.log(error.message);
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
