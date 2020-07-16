import React from "react";
import PropTypes from "prop-types";

const Login = ({ login }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
};
export default Login;
