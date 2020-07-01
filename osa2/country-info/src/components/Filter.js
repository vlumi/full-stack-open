import React from "react";

const Filter = ({ searchString, setSearchString }) => {
  return (
    <div>
      Find countries:{" "}
      <input
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
    </div>
  );
};

export default Filter;
