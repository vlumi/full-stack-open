import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </>
);

export default Persons;
