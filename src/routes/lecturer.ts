import { Router } from "express";
import {
  addLecturer,
  getLecturers,
  importLecturers,
} from "../controllers/lecturer";

const router = Router();

router.get("/", getLecturers);
router.post("/", addLecturer);
router.post("/import", importLecturers);

export default router;
