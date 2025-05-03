import { Router } from "express";
import {
  createTimetable,
  draftTimetable,
  getTimetableByHash,
} from "../controllers/timetable";

const router = Router();

router.post("/", createTimetable);
router.post("/draft", draftTimetable);
router.get("/:hash", getTimetableByHash);

export default router;
