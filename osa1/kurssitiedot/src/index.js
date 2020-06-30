import React from "react";
import ReactDOM from "react-dom";

const Header = ({ name }) => <h1>{name}</h1>;
const Content = ({ parts }) => (
  <>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </>
);
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
const Total = ({ exercises }) => (
  <p>Number of exercises {exercises.reduce((a, b) => a + b, 0)}</p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((x) => x.exercises)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
