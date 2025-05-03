import { Router } from "express";
import { addCourse, getCourses } from "../controllers/course";

const router = Router();

router.get("/", getCourses);
router.post("/", addCourse);

export default router;
