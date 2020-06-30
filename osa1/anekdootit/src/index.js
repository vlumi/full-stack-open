import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Anecdote = ({ anecdote }) => (
  <p>
    <cite>{anecdote}</cite>
  </p>
);
const Votes = ({ votes, count = 1}) => (
  <div>
    {count === 1 ? "has" : "have"} {votes} vote{votes === 1 ? "" : "s"}
  </div>
);
const AnecdoteOfTheDay = ({ anecdote, votes }) => (
  <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdote} />
    <Votes votes={votes} />
  </>
);
const BestAnecdotes = ({ anecdotes, votes }) => {
  if (anecdotes.length === 0) {
    return "";
  }
  const calculateMax = (votes) => {
    let max = 0;
    let maxIndices = [];
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        maxIndices = [i];
      } else if (votes[i] === max) {
        maxIndices.push(i);
      }
    }
    return { maxIndices, max };
  };
  let { maxIndices, max } = calculateMax(votes);
  return (
    <>
      <h1>Anecdote{maxIndices.length === 1 ? "" : "s"} with the most votes</h1>
      {maxIndices.map((i) => (
        <Anecdote key={i} anecdote={anecdotes[i]} />
      ))}
      <Votes votes={max} count={maxIndices.length} />
    </>
  );
};
const Button = ({ handleClick, label }) => (
  <button onClick={handleClick}>{label}</button>
);

const App = (props) => {
  const getRandom = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(getRandom());
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const vote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };
  const randomizeAnecdote = () => setSelected(getRandom);

  return (
    <>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <div>
        <Button handleClick={vote} label="Vote" />
        <Button handleClick={randomizeAnecdote} label="Next Anecdote" />
      </div>
      <BestAnecdotes anecdotes={anecdotes} votes={votes} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
