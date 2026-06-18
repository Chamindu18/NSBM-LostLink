import {
  createNotification,
  getNotificationsByUser,
  markNotificationRead,
  markAllNotificationsRead,
} from "../repositories/notification.repository";

export const createNewNotification =
  async (
    userId: string,
    type:
      | "MATCH_FOUND"
      | "CLAIM_APPROVED"
      | "CLAIM_REJECTED"
      | "SYSTEM",
    message: string
  ) => {
    return createNotification(
      userId,
      type,
      message
    );
  };

export const fetchUserNotifications =
  async (userId: string) => {
    return getNotificationsByUser(
      userId
    );
  };

export const readNotification = async (
  notificationId: string
) => {
  return markNotificationRead(
    notificationId
  );
};

export const readAllNotifications =
  async (userId: string) => {
    return markAllNotificationsRead(
      userId
    );
  };