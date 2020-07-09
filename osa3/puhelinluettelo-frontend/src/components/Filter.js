import React from "react";
import PropTypes from "prop-types";

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterNameChange = (event) => setFilterName(event.target.value);
  return (
    <div>
      Filter by name:{" "}
      <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  );
};
Filter.propTypes = {
  filterName: PropTypes.string,
  setFilterName: PropTypes.func,
};

export default Filter;
