import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
} from "../repositories/auth.repository";

import {
  RegisterInput,
  LoginInput,
} from "../types/auth.types";

export const registerUser = async (data: RegisterInput) => {
  // Check if email already exists
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await createUser(
    data.studentId,
    data.name,
    data.email,
    hashedPassword
  );

  // Remove password from response
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const loginUser = async (data: LoginInput) => {
  // Find user by email
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  // Remove password before sending response
  const { password, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};