import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ handleClick, label }) => (
  <button onClick={handleClick}>{label}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}:</th>
    <td>{value}</td>
  </tr>
);
const Average = ({ good, bad, total }) => {
  const score = good - bad;
  const average = total === 0 ? 0 : score / total;
  return (
    <tr>
      <th>Average:</th>
      <td>{average}</td>
    </tr>
  );
};
const Positive = ({ good, total }) => {
  const positive = total === 0 ? 0 : (good * 100) / total;
  return (
    <tr>
      <th>Positive:</th>
      <td>{positive} %</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <div>"No feedback given"</div>
      </>
    );
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <Average good={good} bad={bad} total={total} />
          <Positive good={good} total={total} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={() => setGood(good + 1)} label="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} label="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} label="Bad" />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
