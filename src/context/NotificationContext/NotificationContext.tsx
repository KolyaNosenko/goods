import React from "react";

export interface NotificationContextData {
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const NotificationContext = React.createContext<NotificationContextData>({
  notify: {
    // TODO add all methods
    success: (message: string) => {},
    error: (message: string) => {},
    info: (message: string) => {},
  },
});

export default NotificationContext;
