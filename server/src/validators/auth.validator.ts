import { z } from "zod";

export const registerSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(6)
});