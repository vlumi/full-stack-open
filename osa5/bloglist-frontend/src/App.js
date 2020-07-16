import React from "react";

import "./App.css";

import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";

import loginService from "./services/login";
import blogService from "./services/blogs";

const MESSAGE_DURATION = 2000;

const App = () => {
  const [message, setMessage] = React.useState("");
  const [messageTimeout, setMessageTimeout] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorMessageTimeout, setErrorMessageTimeout] = React.useState("");

  const [user, setUser] = React.useState(undefined);
  const [blogs, setBlogs] = React.useState([]);

  const blogFormRef = React.useRef();

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    clearTimeout(errorMessageTimeout);
    setErrorMessageTimeout(
      setTimeout(() => {
        setErrorMessage("");
      }, MESSAGE_DURATION)
    );
  };
  const showMessage = (message) => {
    setMessage(message);
    clearTimeout(messageTimeout);
    setMessageTimeout(
      setTimeout(() => {
        setMessage("");
      }, MESSAGE_DURATION)
    );
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.setToken);
      setUser(user);
      showMessage(`Login successful. Welcome ${user.username}!`);
      return true;
    } catch (error) {
      blogService.setToken(undefined);
      setUser(undefined);
      showErrorMessage("Invalid credentials");
      return false;
    }
  };
  const logout = async () => {
    window.localStorage.clear();
    blogService.setToken(undefined);
    setUser(undefined);
    showMessage("Logout successful.");
  };
  const addBlog = async (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      showMessage("Blog successfully added");
      blogFormRef.current.toggle();
      return true;
    } catch (error) {
      console.error("Adding blog failed with error:", error);
      showErrorMessage("Adding blog failed");
      return false;
    }
  };
  const removeBlog = async (targetBlog) => {
    if (
      !window.confirm(`Delete "${targetBlog.title}" by ${targetBlog.author}`)
    ) {
      return false;
    }
    try {
      await blogService.remove(targetBlog.id);
      setBlogs(blogs.filter((blog) => blog.id !== targetBlog.id));
      return true;
    } catch (error) {
      console.error("Removing blog failed with error:", error);
      showErrorMessage("Removing blog failed");
      return false;
    }
  };
  const likeBlog = async (targetBlog) => {
    try {
      await blogService.update(targetBlog.id, targetBlog);
      setBlogs(
        blogs.map((blog) => (blog.id === targetBlog.id ? targetBlog : blog))
      );
      return true;
    } catch (error) {
      console.error("Liking blog failed with error:", error);
      showErrorMessage("Liking blog failed");
      return false;
    }
  };

  React.useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errorMessage={errorMessage} />
      {!user ? (
        <>
          <Toggleable showLabel="Show login" hideLabel="Cancel">
            <h2>Login</h2>
            <Login login={login} />
          </Toggleable>
        </>
      ) : (
        <>
          <Logout user={user} logout={logout} />
          <Toggleable showLabel="New blog" hideLabel="Cancel" ref={blogFormRef}>
            <AddBlog addBlog={addBlog} />
          </Toggleable>
        </>
      )}
      <Blogs blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />
    </div>
  );
};

export default App;
