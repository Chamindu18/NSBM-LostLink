import prisma from "../config/prisma";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (
  studentId: string,
  name: string,
  email: string,
  password: string
) => {
  return prisma.user.create({
    data: {
      studentId,
      name,
      email,
      password,
    },
  });
};