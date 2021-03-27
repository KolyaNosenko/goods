import { NotificationContextData } from "src/context/NotificationContext";

export function getNotificationContextValue(
  value: Partial<NotificationContextData> = {}
): NotificationContextData {
  return {
    success: (message) => {},
    error: (message) => {},
    info: (message) => {},
    ...value,
  };
}
