import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { createItem } from "../controllers/item.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  createItem
);

export default router;