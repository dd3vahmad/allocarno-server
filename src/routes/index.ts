// import userRoutes from "./user";
// import messagesRoutes from "./message";
import timetablesRoutes from "./timetable";
import authRoutes from "./auth";
import { Router } from "express";

const protectedRoutes = Router();

// protectedRoutes.use("/users", userRoutes);
// protectedRoutes.use("/messages", messagesRoutes);
protectedRoutes.use("/timetables", timetablesRoutes);

export { authRoutes, protectedRoutes };
