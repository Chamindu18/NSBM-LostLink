import prisma from "../config/prisma";

export const createNotification = async (
  userId: string,
  type:
    | "MATCH_FOUND"
    | "CLAIM_APPROVED"
    | "CLAIM_REJECTED"
    | "SYSTEM",
  message: string
) => {
  return prisma.notification.create({
    data: {
      userId,
      type,
      message,
    },
  });
};

export const getNotificationsByUser = async (
  userId: string
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markNotificationRead = async (
  id: string
) => {
  return prisma.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
};

export const markAllNotificationsRead =
  async (userId: string) => {
    return prisma.notification.updateMany({
      where: {
        userId,
      },
      data: {
        read: true,
      },
    });
  };