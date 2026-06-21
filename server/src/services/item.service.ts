import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../repositories/item.repository";

import {
  CreateItemInput,
  UpdateItemInput,
} from "../types/item.types";

export const createNewItem = async (
  data: CreateItemInput,
  userId: string
) => {
  return createItem({
    ...data,
    userId,
  });
};

export const fetchAllItems = async (
  title?: string,
  status?: string,
  category?: string,
  location?: string
) => {
  return getAllItems(
    title,
    status,
    category,
    location
  );
};

export const fetchItemById = async (
  itemId: string
) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
};

export const updateExistingItem = async (
  itemId: string,
  data: UpdateItemInput,
  userId: string
) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  if (item.userId !== userId) {
    throw new Error("Forbidden");
  }

  return updateItem(itemId, data);
};

export const deleteExistingItem = async (
  itemId: string,
  userId: string
) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  if (item.userId !== userId) {
    throw new Error("Forbidden");
  }

  await deleteItem(itemId);
};