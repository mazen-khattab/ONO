import React, { createContext, useState, useContext, ReactNode } from "react";

interface MessageContextType {
  message: string | null;
  isSuccess: boolean;
  showMessage: (msg: string, isSuccess: boolean) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const showMessage = (msg: string, isSuccess: boolean) => {
    setMessage(msg);
    setIsSuccess(isSuccess);

    setTimeout(() => {
      clearMessage();
    }, 3000);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ message, isSuccess, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};


export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessage must be used inside a MessageProvider");
    }
    return context;
};
