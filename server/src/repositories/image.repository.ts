import prisma from "../config/prisma";

export const createImage = async (
  imageUrl: string,
  itemId: string
) => {
  return prisma.itemImage.create({
    data: {
      imageUrl,
      itemId,
    },
  });
};

export const createManyImages = async (
  imageUrls: string[],
  itemId: string
) => {
  return prisma.itemImage.createMany({
    data: imageUrls.map((url) => ({
      imageUrl: url,
      itemId,
    })),
  });
};

export const getImagesByItemId = async (
  itemId: string
) => {
  return prisma.itemImage.findMany({
    where: {
      itemId,
    },
  });
};

export const deleteImageById = async (
  id: string
) => {
  return prisma.itemImage.delete({
    where: {
      id,
    },
  });
};