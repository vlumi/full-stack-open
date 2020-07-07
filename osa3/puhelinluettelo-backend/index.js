require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", function (req, res) {
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
  var errors = [];
  if (!req.body.name) {
    errors.push("Name must be present");
  }
  if (!req.body.number) {
    errors.push("Number must be present");
  }
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).json({
      error: errors.join("; "),
    });
  }

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
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
