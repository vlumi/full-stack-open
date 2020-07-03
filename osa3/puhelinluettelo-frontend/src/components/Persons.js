import React from "react";
import Person from "./Person";

const Persons = ({ persons ,deletePerson}) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <Person key={person.id} person={person} deletePerson={deletePerson} />
    ))}
  </>
);

export default Persons;
