import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getNotifications,
  markNotificationAsRead,
  markAllAsRead,
} from "../controllers/notification.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getNotifications
);

router.put(
  "/read-all",
  authenticate,
  markAllAsRead
);

router.put(
  "/:id/read",
  authenticate,
  markNotificationAsRead
);

export default router;