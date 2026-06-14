import { Response } from "express";

import { AuthRequest } from "../types/authRequest.types";

import { createItemSchema } from "../validators/item.validator";

import { createNewItem } from "../services/item.service";

export const createItem = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const validatedData = createItemSchema.parse(req.body);

    const item = await createNewItem(
      validatedData,
      req.user!.userId
    );

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create item",
    });
  }
};