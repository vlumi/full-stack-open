const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const input = process.argv.slice(3);

const url = `mongodb+srv://fullstack:${password}@cluster0.awzj5.mongodb.net/puhelinnumero?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

if (input.length == 2) {
  const generateId = () => Math.floor(Math.random() * 1000000000);
  const [name, number] = input;
  console.log("Creating person", name, number);
  const person = new Person({
    name: name,
    number: number,
    id: generateId(),
  });

  person.save().then((response) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  console.log("Phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
