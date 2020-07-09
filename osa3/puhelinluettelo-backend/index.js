require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const Person = require("./models/persons");

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const content =
        `<p>Phonebook has info for ${persons.length} people</p>` +
        `<p>${new Date()}</p>`;
      res.send(content);
    })
    .catch((error) => next(error));
});
app.get("/api/persons", (req, res, next) =>
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error))
);
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
const generateId = () => Math.floor(Math.random() * 1000000000);
app.post("/api/persons", (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
    id: generateId(),
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    number: req.body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error);
  console.error(error.message);

  switch (error.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
