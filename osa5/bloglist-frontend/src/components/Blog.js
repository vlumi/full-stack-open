import React from "react";

import BlogDetails from "./BlogDetails";

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [visible, setVisible] = React.useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggle = () => setVisible(!visible);

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick={toggle}>Show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author} <button onClick={toggle}>Hide</button>
        <BlogDetails blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
      </div>
    </div>
  );
};

export default Blog;
