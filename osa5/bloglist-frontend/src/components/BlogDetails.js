import React from "react";
import PropTypes from "prop-types";

const BlogDetails = ({ blog, likeBlog, removeBlog }) => {
  const like = () => likeBlog({ ...blog, likes: blog.likes + 1 });
  return (
    <>
      <div>URL: {blog.url}</div>
      <div>
        Likes: {blog.likes} <button onClick={like}>Like</button>
      </div>
      <div>Author: {blog.author}</div>
      <button onClick={() => removeBlog(blog)}>Remove</button>
    </>
  );
};
BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};
export default BlogDetails;
