import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { protectedRoutes } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// app.use("/api/auth", authRoutes);
// app.use("/api/v1/", authenticate, protectedRoutes);
app.use("/api/v1/", protectedRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || "Internal Server Error";

  // I don't know what void means but I hate unused code...
  void next;
  void req;

  return res.status(statusCode).json({ message, failed: true }) as any;
});

app.get("/", (req: Request, res: Response) => {
  res.render("i", {
    title: `Hi ${req.hostname}! Welcome to Allocarno Backend.`,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
