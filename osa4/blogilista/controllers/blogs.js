const jwt = require("jsonwebtoken");

const router = require("express").Router();
module.exports = router;

const Blog = require("../models/blogs");
const User = require("../models/users");

router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
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

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    user: user,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(400)
        .send({ error: "Blogs can only be deleted by the user who added them" })
        .end();
    }
  } else {
    response.status(204).end();
  }
});
