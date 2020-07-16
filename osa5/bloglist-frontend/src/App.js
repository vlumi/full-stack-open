import React, { useState, useEffect } from "react";

import "./App.css";

import Notification from "./components/Notification";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";

import loginService from "./services/login";
import blogService from "./services/blogs";

const MESSAGE_DURATION = 2000;

const App = () => {
  const [message, setMessage] = useState("");
  const [messageTimeout, setMessageTimeout] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageTimeout, setErrorMessageTimeout] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(undefined);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [blogs, setBlogs] = useState([]);

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

  const login = async () => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.setToken);
      setUser(user);
      setUsername("");
      setPassword("");
      showMessage(`Login successful. Welcome ${user.username}!`);
    } catch (error) {
      blogService.setToken(undefined);
      setUser(undefined);
      showErrorMessage("Invalid credentials");
    }
  };
  const logout = async () => {
    window.localStorage.clear();
    blogService.setToken(undefined);
    setUser(undefined);
    showMessage("Logout successful.");
  };
  const addBlog = async () => {
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      showMessage("Blog successfully added");
    } catch (error) {
      console.error("Adding blog failed with error:", error);
      showErrorMessage("Adding blog failed");
    }
  };
  const removeBlog = async (targetBlog) => {
    if (
      !window.confirm(`Delete "${targetBlog.title}" by ${targetBlog.author}`)
    ) {
      return;
    }
    try {
      await blogService.remove(targetBlog.id);
      setBlogs(blogs.filter((blog) => blog.id !== targetBlog.id));
    } catch (error) {
      console.error("Removing blog failed with error:", error);
      showErrorMessage("Removing blog failed");
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
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
          <h2>Login</h2>
          <Login
            login={login}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      ) : (
        <>
          <Logout user={user} logout={logout} />
          <AddBlog
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </>
      )}
      <Blogs blogs={blogs} removeBlog={removeBlog} />
    </div>
  );
};

export default App;
