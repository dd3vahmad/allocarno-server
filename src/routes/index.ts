import hallsRoutes from "./hall";
import coursesRoutes from "./course";
import lecturersRoutes from "./lecturer";
import studentGroupRoutes from "./student-group";
import studentRoutes from "./student";
import timetablesRoutes from "./timetable";
import authRoutes from "./auth";
import { Router } from "express";

const protectedRoutes = Router();

protectedRoutes.use("/courses", coursesRoutes);
protectedRoutes.use("/halls", hallsRoutes);
protectedRoutes.use("/student-groups", studentGroupRoutes);
protectedRoutes.use("/lecturers", lecturersRoutes);
protectedRoutes.use("/timetables", timetablesRoutes);
protectedRoutes.use("/students", studentRoutes);

export { authRoutes, protectedRoutes };
