const debug = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};
const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};
const error = (...params) => console.log(...params);

module.exports = {
  debug,
  info,
  error,
};
