import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlog from "./AddBlog";

test("<AddBlog /> updates parent state and calls onSubmit", () => {
  const addBlog = jest.fn();

  const component = render(<AddBlog addBlog={addBlog} />);

  const title = component.container.querySelector("input[name=title]");
  const author = component.container.querySelector("input[name=author]");
  const url = component.container.querySelector("input[name=url]");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Some fancy title" },
  });
  fireEvent.change(author, {
    target: { value: "Yet another author" },
  });
  fireEvent.change(url, {
    target: { value: "http://foo.bar" },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toBe("Some fancy title");
  expect(addBlog.mock.calls[0][1]).toBe("Yet another author");
  expect(addBlog.mock.calls[0][2]).toBe("http://foo.bar");
});
