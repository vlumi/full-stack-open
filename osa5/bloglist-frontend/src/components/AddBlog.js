import React from "react";

const AddBlog = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  const handleAddBlog = (event) => {
    console.log("here");
    event.preventDefault();
    addBlog();
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
