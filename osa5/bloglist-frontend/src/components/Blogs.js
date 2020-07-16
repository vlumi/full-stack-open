import React from "react";

import Blog from "./Blog";

const Blogs = ({ blogs, removeBlog }) => (
  <>
    {blogs.map((blog) => (
      <Blog key={blog.id} removeBlog={removeBlog} blog={blog} />
    ))}
  </>
);

export default Blogs;
