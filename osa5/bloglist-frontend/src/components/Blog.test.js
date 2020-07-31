import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Some blog title",
    author: "Some author",
    url: "http://example.com",
    likes: 42,
    user: undefined,
  };

  render(<Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}} />);

  // screen.debug();
  const title = screen.getAllByText(/Some blog title/);
  expect(title.length).toBe(2);
  expect(title[0]).toBeVisible();
  expect(title[1]).not.toBeVisible();
  const author = screen.getAllByText(/Some author/);
  expect(author.length).toBe(3);
  expect(author[0]).toBeVisible();
  expect(author[1]).not.toBeVisible();
  expect(author[2]).not.toBeVisible();
  const url = screen.getByText(/example.com/);
  expect(url).not.toBeVisible();
  const likes = screen.getByText(/42/);
  expect(likes).not.toBeVisible();
});

test("display all when show clicked", async () => {
  const blog = {
    title: "Some blog title",
    author: "Some author",
    url: "http://example.com",
    likes: 42,
    user: undefined,
  };

  render(<Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}} />);

  const button = screen.getByText("Show");
  fireEvent.click(button);

  const title = screen.getAllByText(/Some blog title/);
  expect(title.length).toBe(2);
  expect(title[0]).not.toBeVisible();
  expect(title[1]).toBeVisible();
  const author = screen.getAllByText(/Some author/);
  expect(author.length).toBe(3);
  expect(author[0]).not.toBeVisible();
  expect(author[1]).toBeVisible();
  expect(author[2]).toBeVisible();
  const url = screen.getByText(/example.com/);
  expect(url).toBeVisible();
  const likes = screen.getByText(/42/);
  expect(likes).toBeVisible();
});

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Some blog title",
    author: "Some author",
    url: "http://example.com",
    likes: 42,
    user: undefined,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} removeBlog={() => {}} />);

  const button = screen.getByText("Like");
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("clicking the button twice calls event handler twice", async () => {
  const blog = {
    title: "Some blog title",
    author: "Some author",
    url: "http://example.com",
    likes: 42,
    user: undefined,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} removeBlog={() => {}} />);

  const button = screen.getByText("Like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
