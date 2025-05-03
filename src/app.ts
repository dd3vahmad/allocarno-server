import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import scheduleRoutes from "./routes/timetable";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/schedule", scheduleRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
