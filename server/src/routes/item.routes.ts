import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { getItems, createItem } from "../controllers/item.controller";

const router = Router();

router.get("/", getItems);

router.post(
  "/",
  authenticate,
  createItem
);

export default router;