import hallsRoutes from "./hall";
import lecturersRoutes from "./lecturer";
import timetablesRoutes from "./timetable";
import authRoutes from "./auth";
import { Router } from "express";

const protectedRoutes = Router();

protectedRoutes.use("/halls", hallsRoutes);
protectedRoutes.use("/lecturers", lecturersRoutes);
protectedRoutes.use("/timetables", timetablesRoutes);

export { authRoutes, protectedRoutes };
