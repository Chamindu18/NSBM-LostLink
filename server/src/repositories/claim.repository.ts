import prisma from "../config/prisma";

export const createClaim = async (
  message: string,
  userId: string,
  itemId: string
) => {
  return prisma.claim.create({
    data: {
      message,
      userId,
      itemId,
    },
  });
};

export const getAllClaims = async () => {
  return prisma.claim.findMany({
    include: {
      user: true,
      item: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getClaimById = async (
  id: string
) => {
  return prisma.claim.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      item: true,
    },
  });
};

export const getPendingClaimForItem = async (
  itemId: string
) => {
  return prisma.claim.findFirst({
    where: {
      itemId,
      status: "PENDING",
    },
  });
};

export const updateClaimStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  return prisma.claim.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const updateItemStatus = async (
  itemId: string,
  status:
    | "CLAIM_PENDING"
    | "RETURNED"
    | "FOUND"
    | "LOST"
) => {
  return prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      status,
    },
  });
};