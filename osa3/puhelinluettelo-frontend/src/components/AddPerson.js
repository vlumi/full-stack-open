import React from "react";

const AddPerson = ({
  createPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  const handleAddPerson = (event) => {
    event.preventDefault();
    createPerson({
      name: newName,
      number: newNumber,
    });
  };
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  return (
    <>
      <h2>New Entry</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default AddPerson;
