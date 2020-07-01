import React from "react";

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts.map((x) => x.exercises)} />
  </>
);
const Header = ({ name }) => <h1>{name}</h1>;
const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Total = ({ exercises }) => (
  <p>
    <strong>Total of {exercises.reduce((a, b) => a + b, 0)} exercises</strong>
  </p>
);

export default Course;
