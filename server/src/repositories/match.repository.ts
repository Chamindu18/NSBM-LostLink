import prisma from "../config/prisma";

export const findPotentialMatches = async (
  itemId: string
) => {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      category: true,
      location: true,
      user: true,
    },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  const oppositeStatus =
    item.status === "LOST"
      ? "FOUND"
      : "LOST";

  return prisma.item.findMany({
    where: {
      status: oppositeStatus,
      categoryId: item.categoryId,
      locationId: item.locationId,
      id: {
        not: item.id,
      },
    },
    include: {
      user: true,
      category: true,
      location: true,
      images: true,
    },
  });
};