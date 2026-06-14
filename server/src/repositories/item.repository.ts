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

export const getAllItems = async () => {
  return prisma.item.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          studentId: true,
        },
      },
      category: true,
      location: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};