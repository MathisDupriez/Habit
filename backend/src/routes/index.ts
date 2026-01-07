import { Router } from "express";
import authRoutes from "./authRoutes";
import habitRoutes from "./habitRoutes";
import logRoutes from "./logRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);
router.use("/logs", logRoutes);

export default router;
