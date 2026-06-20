import { findPotentialMatches } from "../repositories/match.repository";
import { getItemById } from "../repositories/item.repository";

import { createNewNotification } from "./notification.service";

export const findMatchesForItem = async (
  itemId: string
) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  const matches =
    await findPotentialMatches(itemId);

  if (matches.length > 0) {
    await createNewNotification(
      item.userId,
      "MATCH_FOUND",
      "Potential matching item found."
    );
  }

  return matches;
};