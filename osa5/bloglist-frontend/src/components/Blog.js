import React from "react";

const Blog = ({ blog, removeBlog }) => (
  <div>
    {blog.title} {blog.author}{" "}
    <button onClick={() => removeBlog(blog)}>Remove</button>
  </div>
);

export default Blog;
