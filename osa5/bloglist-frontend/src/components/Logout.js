import React from "react";
import PropTypes from "prop-types";

const Logout = ({ user, logout }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <>
      <form onSubmit={handleLogout}>
        <div>
          <p>
            User: {user.username} <button type="submit">Logout</button>
          </p>
        </div>
      </form>
    </>
  );
};
Logout.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
export default Logout;
