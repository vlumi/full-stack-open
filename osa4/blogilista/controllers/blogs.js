const router = require("express").Router();
module.exports = router;

const Blog = require("../models/blogs");

router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
    return;
  }
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  const result = await blog.save();
  response.status(201).json(result);
});

router.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

router.put("/:id", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
    return;
  }
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });
  response.json(result);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});
