import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { getMatches } from "../controllers/match.controller";

const router = Router();

router.get(
  "/:itemId",
  authenticate,
  getMatches
);

export default router;