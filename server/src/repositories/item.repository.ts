import prisma from "../config/prisma";

export const createItem = async (
  data: {
    title: string;
    description: string;
    categoryId: string;
    locationId: string;
    status: "LOST" | "FOUND";
    date: Date;
    userId: string;
  }
) => {
  return prisma.item.create({
    data,
  });
};