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

export const getAllItems = async (
  title?: string,
  status?: string,
  category?: string,
  location?: string
) => {
  return prisma.item.findMany({
    where: {
      ...(title && {
        title: {
          contains: title,
          mode: "insensitive",
        },
      }),

      ...(status && {
        status: status as any,
      }),

      ...(category && {
        category: {
          name: {
            equals: category,
            mode: "insensitive",
          },
        },
      }),

      ...(location && {
        location: {
          name: {
            equals: location,
            mode: "insensitive",
          },
        },
      }),
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
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