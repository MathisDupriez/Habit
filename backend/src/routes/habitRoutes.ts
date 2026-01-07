import { Router } from "express";
import { HabitController } from "../controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const habitController = new HabitController();

router.use(authMiddleware);

router.get("/", (req, res) => habitController.getAll(req, res));
router.get("/:id", (req, res) => habitController.getById(req, res));
router.post("/", (req, res) => habitController.create(req, res));
router.put("/:id", (req, res) => habitController.update(req, res));
router.delete("/:id", (req, res) => habitController.delete(req, res));

export default router;
