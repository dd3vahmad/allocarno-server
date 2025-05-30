import { Router } from "express";

import {
  addStudent,
  getStudents
} from "../controllers/student";

const router = Router();

router.get("/", getStudents);
router.post("/", addStudent);

export default router;
