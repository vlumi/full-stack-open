const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blogs");

const { initialBlogs, blogsInDb } = require("./helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("all blogs have an id field", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
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
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("FP vs. OO");
});

test("new blog with likes resets to 0", async () => {
  const newBlog = {
    title: "FP vs. OO",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
  };

  await api.post("/api/blogs").send(newBlog);

  const blogsAtEnd = await blogsInDb();
  const newLikes = blogsAtEnd[blogsAtEnd.length - 1].likes;
  expect(newLikes).toEqual(0);
});

test("new blog requires title and url", async () => {
  const newBlog = {};

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.title += " Updated";

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  expect(blogsAtEnd[0].title).toBe(blogToUpdate.title);
});

afterAll(() => {
  mongoose.connection.close();
});
