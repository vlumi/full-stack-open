import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const DB_URL = "http://localhost:3001/persons";
  useEffect(() => {
    axios.get(DB_URL).then((response) => setPersons(response.data));
  }, []);

  const filteredPersons =
    filterName.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(new RegExp(filterName))
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
