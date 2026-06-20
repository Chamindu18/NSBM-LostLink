import { Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { AuthRequest } from "../types/authRequest.types";

export const authenticate: RequestHandler = (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      role: string;
    };

    (req as AuthRequest).user = decoded;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};