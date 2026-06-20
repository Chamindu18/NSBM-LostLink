import { RequestHandler } from "express";

import { AuthRequest } from "../services/types/authRequest.types";

import {
  createItemSchema,
  updateItemSchema,
} from "../validators/item.validator";

import {
  fetchAllItems,
  createNewItem,
  fetchItemById,
  updateExistingItem,
  deleteExistingItem,
} from "../services/item.service";

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

export const getItem: RequestHandler = async (
  req,
  res
) => {
  try {
    const item = await fetchItemById(
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Item not found",
    });
  }
};

export const updateItem: RequestHandler = async (
  req,
  res
) => {
  try {
    const validatedData =
      updateItemSchema.parse(req.body);

    const item = await updateExistingItem(
      String(req.params.id),
      validatedData,
      (req as AuthRequest).user!.userId
    );

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Update failed",
    });
  }
};

export const deleteItem: RequestHandler = async (
  req,
  res
) => {
  try {
    await deleteExistingItem(
      String(req.params.id),
      (req as AuthRequest).user!.userId
    );

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Delete failed",
    });
  }
};