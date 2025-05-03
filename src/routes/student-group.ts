import { Router } from "express";
import {
  addStudentGroup,
  getStudentGroups,
  importStudentGroups,
} from "../controllers/student-group";

const router = Router();

router.get("/", getStudentGroups);
router.post("/", addStudentGroup);
router.post("/import", importStudentGroups);

export default router;
