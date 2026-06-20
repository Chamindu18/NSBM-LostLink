import prisma from "../config/prisma";

export const getDashboardStats = async () => {
  const [
    users,
    items,
    lostItems,
    foundItems,
    claims,
    notifications,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.item.count(),

    prisma.item.count({
      where: {
        status: "LOST",
      },
    }),

    prisma.item.count({
      where: {
        status: "FOUND",
      },
    }),

    prisma.claim.count(),

    prisma.notification.count(),
  ]);

  return {
    users,
    items,
    lostItems,
    foundItems,
    claims,
    notifications,
  };
};