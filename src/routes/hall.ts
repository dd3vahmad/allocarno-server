import { Router } from "express";
import {
  addHall,
  getHalls,
  getActiveHalls,
  importHalls,
} from "../controllers/hall";

const router = Router();

router.get("/", getHalls);
router.get("/active", getActiveHalls);
router.post("/", addHall);
router.post("/import", importHalls);

export default router;
