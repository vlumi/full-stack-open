import React from "react";
import axios from "axios";
import Weather from "./Weather";

const loadWeather = (country, weatherInfo, setWeatherInfo) => {
  // Mark as loading, to prevent duplicate requests
  setWeatherInfo({ ...weatherInfo, [country.name]: "Loading..." });

  const API_KEY = process.env.REACT_APP_API_KEY;
  const location = encodeURIComponent(`${country.capital}, ${country.name}`);
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}&units=m`;
  axios.get(URL).then((response) =>
    setWeatherInfo({
      ...weatherInfo,
      [country.name]: response.data,
    })
  );
};

const Title = ({ name }) => <h1>{name}</h1>;
const Information = ({ country }) => (
  <div>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
  </div>
);
const Languages = ({ languages }) => (
  <>
    <h2>Languages</h2>
    <ul>
      {languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
  </>
);
const Flag = ({ name, flagUrl }) => (
  <div>
    <img className="flag" src={flagUrl} alt={name} />
  </div>
);

const Country = ({ country, weatherInfo, setWeatherInfo }) => {
  if (!weatherInfo[country.name]) {
    console.log(`Loading weather for ${country.name}`);
    // Yield the thread, loading the weather information only after this update is finished
    setTimeout(() => loadWeather(country, weatherInfo, setWeatherInfo), 0);
  }

  return (
    <>
      <Title name={country.name} />
      <Information country={country} />
      <Languages languages={country.languages} />
      <Flag flagUrl={country.flag} name={country.name} />
      <Weather country={country} weatherInfo={weatherInfo} />
    </>
  );
};

export default Country;
