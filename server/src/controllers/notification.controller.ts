import { RequestHandler } from "express";

import { AuthRequest } from "../types/authRequest.types";

import {
  fetchUserNotifications,
  readNotification,
  readAllNotifications,
} from "../services/notification.service";

export const getNotifications: RequestHandler =
  async (req, res) => {
    try {
      const notifications =
        await fetchUserNotifications(
          (req as AuthRequest).user!.userId
        );

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch notifications",
      });
    }
  };

export const markNotificationAsRead: RequestHandler =
  async (req, res) => {
    try {
      const notification =
        await readNotification(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        message:
          "Notification marked as read",
        data: notification,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed",
      });
    }
  };

export const markAllAsRead: RequestHandler =
  async (req, res) => {
    try {
      await readAllNotifications(
        (req as AuthRequest).user!.userId
      );

      res.status(200).json({
        success: true,
        message:
          "All notifications marked as read",
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to update notifications",
      });
    }
  };