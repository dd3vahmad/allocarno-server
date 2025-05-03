import { Router } from "express";
import { addHall, getHalls, importHalls } from "../controllers/hall";

const router = Router();

router.get("/", getHalls);
router.post("/", addHall);
router.post("/import", importHalls);

export default router;
