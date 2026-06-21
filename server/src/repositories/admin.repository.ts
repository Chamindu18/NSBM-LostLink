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

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      studentId: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllItemsAdmin = async () => {
  return prisma.item.findMany({
    include: {
      user: true,
      category: true,
      location: true,
      images: true,
      claims: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllClaimsAdmin = async () => {
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

export const deleteClaimAdmin = async (
  claimId: string
) => {
  return prisma.claim.delete({
    where: {
      id: claimId,
    },
  });
};

export const deleteItemAdmin = async (
  itemId: string
) => {
  await prisma.itemImage.deleteMany({
    where: {
      itemId,
    },
  });

  await prisma.claim.deleteMany({
    where: {
      itemId,
    },
  });

  return prisma.item.delete({
    where: {
      id: itemId,
    },
  });
};

export const deleteUserAdmin = async (
  userId: string
) => {
  const items = await prisma.item.findMany({
    where: {
      userId,
    },
  });

  for (const item of items) {
    await prisma.itemImage.deleteMany({
      where: {
        itemId: item.id,
      },
    });

    await prisma.claim.deleteMany({
      where: {
        itemId: item.id,
      },
    });
  }

  await prisma.item.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.claim.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.notification.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.auditLog.deleteMany({
    where: {
      userId,
    },
  });

  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};