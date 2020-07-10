const groupBy = require("lodash.groupby");
const { reduce } = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }
  return Object.entries(
    groupBy(
      blogs.map((blog) => blog.author),
      (author) => author
    )
  )
    .map((entry) => {
      return {
        author: entry[0],
        blogs: entry[1].length,
      };
    })
    .reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined;
  }
  return Object.entries(groupBy(blogs, (blog) => blog.author))
    .map((entry) => {
      const author = entry[0];
      const authorBlogs = entry[1];
      const totalLikes = authorBlogs
        .map((blog) => blog.likes)
        .reduce((a, b) => a + b);
      return { author: author, likes: totalLikes };
    })
    .reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
