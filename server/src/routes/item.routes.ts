import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getItems,
  getItem,
  createItem,
  updateItem,
} from "../controllers/item.controller";

const router = Router();

// Get all items
router.get("/", getItems);

// Get single item
router.get("/:id", getItem);

// Create item
router.post(
  "/",
  authenticate,
  createItem
);

// Update item
router.put(
  "/:id",
  authenticate,
  updateItem
);

export default router;