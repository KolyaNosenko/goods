import React from "react";

export interface NotificationContextData {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

export const NotificationContext = React.createContext<NotificationContextData>(
  {
    // TODO add all methods
    success: (message: string) => {},
    error: (message: string) => {},
    info: (message: string) => {},
  }
);
