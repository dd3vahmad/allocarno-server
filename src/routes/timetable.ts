import { Router } from "express";
import { createTimetable, getTimetableByHash } from "../controllers/timetable";

const router = Router();

router.post("/", createTimetable);
router.get("/:hash", getTimetableByHash);

export default router;
