import { RequestHandler } from "express";

import { fetchDashboardStats } from "../services/admin.service";

export const getDashboard: RequestHandler =
  async (req, res) => {
    try {
      const stats =
        await fetchDashboardStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard",
      });
    }
  };