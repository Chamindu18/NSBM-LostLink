import {
  createClaim,
  getAllClaims,
  getClaimById,
  getPendingClaimForItem,
  updateClaimStatus,
  updateItemStatus,
} from "../repositories/claim.repository";

import { getItemById } from "../repositories/item.repository";

import { createNewNotification } from "./notification.service";

export const createNewClaim = async (
  message: string,
  userId: string,
  itemId: string
) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  const existingClaim =
    await getPendingClaimForItem(itemId);

  if (existingClaim) {
    throw new Error(
      "A pending claim already exists"
    );
  }

  const claim = await createClaim(
    message,
    userId,
    itemId
  );

  await updateItemStatus(
    itemId,
    "CLAIM_PENDING"
  );

  await createNewNotification(
    item.userId,
    "SYSTEM",
    "Someone submitted a claim for your item."
  );

  return claim;
};

export const fetchAllClaims = async () => {
  return getAllClaims();
};

export const fetchClaimById = async (
  claimId: string
) => {
  const claim = await getClaimById(
    claimId
  );

  if (!claim) {
    throw new Error("Claim not found");
  }

  return claim;
};

export const approveExistingClaim =
  async (claimId: string) => {
    const claim =
      await getClaimById(claimId);

    if (!claim) {
      throw new Error("Claim not found");
    }

    await updateClaimStatus(
      claimId,
      "APPROVED"
    );

    await updateItemStatus(
      claim.itemId,
      "RETURNED"
    );

    await createNewNotification(
      claim.userId,
      "CLAIM_APPROVED",
      "Your claim has been approved."
    );

    return getClaimById(claimId);
  };

export const rejectExistingClaim =
  async (claimId: string) => {
    const claim =
      await getClaimById(claimId);

    if (!claim) {
      throw new Error("Claim not found");
    }

    await updateClaimStatus(
      claimId,
      "REJECTED"
    );

    await updateItemStatus(
      claim.itemId,
      "FOUND"
    );

    await createNewNotification(
      claim.userId,
      "CLAIM_REJECTED",
      "Your claim has been rejected."
    );

    return getClaimById(claimId);
  };