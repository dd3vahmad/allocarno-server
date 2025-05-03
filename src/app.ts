import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes, protectedRoutes } from "./routes";
import path from "path";
import { authenticate } from "./middleware/authenticate";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/v1/", protectedRoutes);
// app.use("/api/v1/", authenticate, protectedRoutes);

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

export default app;
