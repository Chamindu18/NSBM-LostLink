import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
} from "../repositories/auth.repository";

import { RegisterInput } from "../types/auth.types";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser(
    data.studentId,
    data.name,
    data.email,
    hashedPassword
  );

  return user;
};