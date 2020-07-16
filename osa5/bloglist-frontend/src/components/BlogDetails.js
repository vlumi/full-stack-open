import React from "react";

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

export default BlogDetails;
