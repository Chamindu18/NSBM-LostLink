import { createItem } from "../repositories/item.repository";
import { CreateItemInput } from "../types/item.types";

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