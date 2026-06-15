import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";

const router = Router();

router.get("/", getItems);

router.get("/:id", getItem);

router.post(
  "/",
  authenticate,
  createItem
);

router.put(
  "/:id",
  authenticate,
  updateItem
);

router.delete(
  "/:id",
  authenticate,
  deleteItem
);

export default router;