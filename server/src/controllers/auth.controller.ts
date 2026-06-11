import { Request, Response } from "express";

import { registerUser } from "../services/auth.service";

import { registerSchema } from "../validators/auth.validator";

import { loginUser } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";

import { AuthRequest } from "../types/authRequest.types";
import { getCurrentUser } from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};

export const me = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await getCurrentUser(
      req.user!.userId
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed",
    });
  }
};