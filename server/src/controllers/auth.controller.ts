import { Request, Response } from "express";

import { registerUser } from "../services/auth.service";

import { registerSchema } from "../validators/auth.validator";

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