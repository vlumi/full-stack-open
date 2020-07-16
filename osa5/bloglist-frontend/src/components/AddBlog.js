import React from "react";

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleAddBlog = (event) => {
    event.preventDefault();
    addBlog(title, author, url);
  };

  return (
    <>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:{" "}
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:{" "}
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddBlog;
