import { Router } from "express";
import { addCourse, getCourses } from "../controllers/course";

const router = Router();

// router.get("/active", getActiveHalls);
// router.post("/import", importHalls);
router.get("/", getCourses);
router.post("/", addCourse);

export default router;
