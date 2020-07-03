import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterNameChange = (event) => setFilterName(event.target.value);
  return (
    <div>
      Filter by name: <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  );
};

export default Filter;
