import { Router } from "express";
import { createTimetable, getTimetableByHash } from "../controllers/timetable";

const router = Router();

router.post("/", createTimetable);
// router.post("/draft", dratTimetable);
router.get("/:hash", getTimetableByHash);

export default router;
