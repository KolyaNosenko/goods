import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NotificationContext } from "./NotificationContext";

export interface Props {
  children?: React.ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  return (
    <NotificationContext.Provider value={toast}>
      <ToastContainer />
      {children}
    </NotificationContext.Provider>
  );
};
