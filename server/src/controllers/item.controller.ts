import { RequestHandler } from "express";

import { AuthRequest } from "../types/authRequest.types";
import { createItemSchema } from "../validators/item.validator";
import { fetchAllItems, createNewItem } from "../services/item.service";

export const createItem: RequestHandler = async (
  req,
  res
) => {
  try {
    const validatedData = createItemSchema.parse(req.body);

    const item = await createNewItem(
      validatedData,
      (req as AuthRequest).user!.userId
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

export const getItems: RequestHandler = async (
  req,
  res
) => {
  try {
    const {
      title,
      status,
      category,
      location,
    } = req.query;

const items = await fetchAllItems(
  title as string,
  status as string,
  category as string,
  location as string
);

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
    });
  }
};