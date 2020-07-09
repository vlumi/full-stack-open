import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, errorMessage }) => {
  return (
    <>
      {errorMessage ? <div className="error">{errorMessage}</div> : ""}
      {message ? <div className="notification">{message}</div> : ""}
    </>
  );
};
Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
};
export default Notification;
