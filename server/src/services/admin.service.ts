import {
  getDashboardStats,
  getAllUsers,
  getAllItemsAdmin,
  getAllClaimsAdmin,
  deleteUserAdmin,
  deleteItemAdmin,
  deleteClaimAdmin,
} from "../repositories/admin.repository";

export const fetchDashboardStats =
  async () => {
    return getDashboardStats();
  };

export const fetchUsers = async () => {
  return getAllUsers();
};

export const fetchItems = async () => {
  return getAllItemsAdmin();
};

export const fetchClaims = async () => {
  return getAllClaimsAdmin();
};

export const removeUser = async (
  userId: string
) => {
  return deleteUserAdmin(userId);
};

export const removeItem = async (
  itemId: string
) => {
  return deleteItemAdmin(itemId);
};

export const removeClaim = async (
  claimId: string
) => {
  return deleteClaimAdmin(claimId);
};