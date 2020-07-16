import React from "react";

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

export default Logout;
