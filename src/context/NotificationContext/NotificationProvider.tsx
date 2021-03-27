import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotificationContext from "./NotificationContext";

export interface Props {
  children?: React.ReactNode;
}

const NotificationProvider = ({ children }: Props) => {
  const notify = toast;

  const contextValue = { notify };

  return (
    <NotificationContext.Provider value={contextValue}>
      <ToastContainer />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
