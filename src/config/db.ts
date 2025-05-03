import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("[DB]: Database connected");
  } catch (err) {
    console.error("[DB]: Database connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
