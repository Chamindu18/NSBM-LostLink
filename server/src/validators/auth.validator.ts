import { z } from "zod";

export const registerSchema = z.object({
  studentId: z.string().min(1),
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});