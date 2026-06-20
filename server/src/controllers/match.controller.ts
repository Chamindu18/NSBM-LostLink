import { RequestHandler } from "express";

import { findMatchesForItem } from "../services/match.service";

export const getMatches: RequestHandler =
  async (req, res) => {
    try {
      const matches =
        await findMatchesForItem(
          String(req.params.itemId)
        );

      res.status(200).json({
        success: true,
        data: matches,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to find matches",
      });
    }
  };