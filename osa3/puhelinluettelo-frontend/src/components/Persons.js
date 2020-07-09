import React from "react";
import PropTypes from "prop-types";

import Person from "./Person";

const Persons = ({ persons, deletePerson }) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <Person key={person.id} person={person} deletePerson={deletePerson} />
    ))}
  </>
);
Persons.propTypes = {
  persons: PropTypes.array,
  deletePerson: PropTypes.func,
};

export default Persons;
