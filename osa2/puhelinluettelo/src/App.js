import React, { useState, useEffect } from "react";

import personService from "./services/persons";

import Notification from "./components/Notification";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";

const MESSAGE_DURATION = 5000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageTimeout, setMessageTimeout] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageTimeout, setErrorMessageTimeout] = useState("");

  useEffect(() => {
    reload();
  }, []);

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    clearTimeout(errorMessageTimeout);
    setErrorMessageTimeout(
      setTimeout(() => {
        setErrorMessage("");
      }, MESSAGE_DURATION)
    );
  };
  const showMessage = (message) => {
    setMessage(message);
    clearTimeout(messageTimeout);
    setMessageTimeout(
      setTimeout(() => {
        setMessage("");
      }, MESSAGE_DURATION)
    );
  };

  const reload = () => {
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons))
      .catch((error) => {
        console.log("failed", error);
      });
  };
  const createPerson = (newPerson) => {
    const duplicates = persons.filter(
      (person) => person.name === newPerson.name
    );
    if (duplicates.length > 1) {
      showErrorMessage(
        `Multiple duplicate persons with name "${newPerson.name}" found, please fix.`
      );
      return;
    }
    if (duplicates.length === 1) {
      const duplicate = duplicates[0];
      const confirmMessage =
        `"${duplicate.name}" is already added to the phonebook. ` +
        `Do you want to replace the old number ${duplicate.number} with ${newPerson.number}?`;
      if (window.confirm(confirmMessage)) {
        updatePerson({ ...duplicate, ...newPerson });
      }
      return;
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showMessage(`Added ${returnedPerson.name}`);
      })
      .catch((error) => {
        console.log("failed", error);
        showErrorMessage(`Person ${newPerson.name} creation failed.`);
      });
  };
  const updatePerson = (updatedPerson) => {
    personService
      .update(updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((oldperson) =>
            oldperson.id === returnedPerson.id ? returnedPerson : oldperson
          )
        );
        setNewName("");
        setNewNumber("");
        showMessage(`Updated ${returnedPerson.name}`);
      })
      .catch((error) => {
        console.log("failed", error);
        showErrorMessage(`Person ${updatedPerson.name} update failed.`);
      });
  };
  const deletePerson = (targetPerson) => {
    if (!window.confirm(`Delete "${targetPerson.name}"`)) {
      return;
    }
    personService
      .remove(targetPerson.id)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== targetPerson.id));
        showMessage(`Deleted ${targetPerson.name}`);
      })
      .catch((error) => {
        console.log("failed", error);
        showErrorMessage(`Person ${targetPerson.name} deletion failed.`);
      });
  };

  const filteredPersons =
    filterName.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(new RegExp(filterName))
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <AddPerson
        createPerson={createPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
