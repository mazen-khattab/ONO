import React from "react";
import { useMessage } from "../../Services/MessageContext";
import "./GlobalMessage.css";

const GlobalMessage: React.FC = () => {
  const { message, isSuccess } = useMessage();

  if (!message) return null; // don't render if there's no message

  return (
    <div className="global-message">
      {message}
      {isSuccess ? (
        <i
          className="fa-solid fa-circle-check fa-lg"
          style={{ color: "#0ed851" }}
        ></i>
      ) : (
        <i
          className="fa-solid fa-circle-xmark fa-lg"
          style={{ color: "#b40303ff" }}
        ></i>
      )}
    </div>
  );
};

export default GlobalMessage;
