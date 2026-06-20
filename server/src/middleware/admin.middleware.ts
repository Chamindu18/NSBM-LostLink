import { RequestHandler } from "express";

import { AuthRequest } from "../types/authRequest.types";

export const requireAdmin: RequestHandler = (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  if (user.role !== "ADMIN") {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
    return;
  }

  next();
};