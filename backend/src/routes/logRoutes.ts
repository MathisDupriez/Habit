import { Router } from "express";
import { HabitLogController } from "../controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const logController = new HabitLogController();

router.use(authMiddleware);

router.get("/date/:date", (req, res) => logController.getByDate(req, res));
router.get("/range", (req, res) => logController.getByDateRange(req, res));
router.get("/stats", (req, res) => logController.getStats(req, res));
router.get("/habit/:habitId", (req, res) => logController.getHabitLogs(req, res));
router.post("/habit/:habitId", (req, res) => logController.toggle(req, res));

export default router;
