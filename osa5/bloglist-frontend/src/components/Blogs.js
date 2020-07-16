import React from "react";
import PropTypes from "prop-types";

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
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};
export default Blogs;
