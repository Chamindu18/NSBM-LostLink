import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  categoryId: z.string(),
  locationId: z.string(),
  status: z.enum(["LOST", "FOUND"]),
  date: z.coerce.date(),
});

export const updateItemSchema = createItemSchema.partial();