import { createItem } from "../repositories/item.repository";
import { CreateItemInput } from "../types/item.types";
import { getAllItems } from "../repositories/item.repository";

export const createNewItem = async (
  data: CreateItemInput,
  userId: string
) => {
  const item = await createItem({
    ...data,
    userId,
  });

  return item;
};

export const fetchAllItems = async () => {
  return getAllItems();
};