import React from "react";

import Blog from "./Blog";

const Blogs = ({ blogs, likeBlog, removeBlog }) => (
  <>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          blog={blog}
        />
      ))}
  </>
);

export default Blogs;
