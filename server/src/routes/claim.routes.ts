import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  createClaim,
  getClaims,
  getClaim,
  approveClaim,
  rejectClaim,
} from "../controllers/claim.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  createClaim
);

router.get(
  "/",
  authenticate,
  getClaims
);

router.get(
  "/:id",
  authenticate,
  getClaim
);

router.put(
  "/:id/approve",
  authenticate,
  approveClaim
);

router.put(
  "/:id/reject",
  authenticate,
  rejectClaim
);

export default router;