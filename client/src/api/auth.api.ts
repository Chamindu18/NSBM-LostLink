import api from "./axios";

import {
  LoginInput,
  RegisterInput,
} from "../types/auth.types";

export const login = async (
  data: LoginInput
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (
  data: RegisterInput
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const getCurrentUser =
  async () => {
    const response = await api.get(
      "/auth/me"
    );

    return response.data;
  };