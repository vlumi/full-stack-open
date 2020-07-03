import React from "react";

const Notification = ({ message, errorMessage }) => {
  return (
    <>
      {errorMessage ? <div className="error">{errorMessage}</div> : ""}
      {message ? <div className="notification">{message}</div> : ""}
    </>
  );
};

export default Notification;
