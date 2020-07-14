const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogs");
const User = require("../models/users");

const { initialBlogs, blogsInDb } = require("./helper");

const loginRoot = async () => {
  const response = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" })
    .expect(200);
  return response.body.token;
};

const loginLatva = async () => {
  const response = await api
    .post("/api/login")
    .send({ username: "latva", password: "sekret" })
    .expect(200);
  return response.body.token;
};

let rootToken = undefined;
let latvaToken = undefined;
let initialBlogsWithUser = initialBlogs;
beforeAll(async () => {
  await User.deleteMany({});
  const passwordRoot = await bcrypt.hash("sekret", 10);
  const userRoot = new User({ username: "root", password: passwordRoot });
  await userRoot.save();
  const passwordLatva = await bcrypt.hash("sekret", 10);
  const userLatva = new User({ username: "latva", password: passwordLatva });
  await userLatva.save();

  rootToken = await loginRoot();
  latvaToken = await loginLatva();

  initialBlogsWithUser = initialBlogs.map((blog) => {
    return { ...blog, user: userRoot.id.toString() };
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogsWithUser);
});

test("all blogs have an id field", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogsWithUser.length);
});

test("a specific blog was returned", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain("Canonical string reduction");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "FP vs. OO",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${rootToken}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("FP vs. OO");
});

test("a valid blog without token cannot be added ", async () => {
  const newBlog = {
    title: "FP vs. OO",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length);
});

test("new blog with likes resets to 0", async () => {
  const newBlog = {
    title: "FP vs. OO",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${rootToken}`)
    .send(newBlog);

  const blogsAtEnd = await blogsInDb();
  const newLikes = blogsAtEnd[blogsAtEnd.length - 1].likes;
  expect(newLikes).toEqual(0);
});

test("new blog requires title and url", async () => {
  const newBlog = {};

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${rootToken}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  blogToView.user = blogToView.user.toString();
  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${rootToken}`)
    .expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test("another blog cannot be deleted", async () => {
  const newBlog = {
    title: "FP vs. OO",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
    likes: 3,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${rootToken}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .set("Authorization", `Bearer ${latvaToken}`)
    .expect(400);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length + 1);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.title += " Updated";

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", `Bearer ${rootToken}`)
    .send(blogToUpdate)
    .expect(200);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogsWithUser.length);
  expect(blogsAtEnd[0].title).toBe(blogToUpdate.title);
});

afterAll(() => {
  mongoose.connection.close();
});
