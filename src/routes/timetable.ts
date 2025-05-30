import { Router } from "express";
import {
  createTimetable,
  draftTimetable,
  getTimetableByHash,
  getTimetables,
  getTimetable
} from "../controllers/timetable";

const router = Router();

router.post("/", createTimetable);
router.post("/draft", draftTimetable);
router.get("/:hash", getTimetableByHash);
router.get("/all", getTimetables);
router.get("/", getTimetable);

export default router;
