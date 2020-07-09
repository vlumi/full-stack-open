import React from "react";
import PropTypes from "prop-types";

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name}: {person.number}{" "}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  );
};
Person.propTypes = {
  person: PropTypes.object,
  deletePerson: PropTypes.func,
};

export default Person;
