import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

import { getDashboard } from "../controllers/admin.controller";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  requireAdmin,
  getDashboard
);

export default router;