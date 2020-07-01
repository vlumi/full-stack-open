import React from "react";

const Country = ({ country }) => (
  <>
    <h1>{country.name}</h1>
    <div>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
    </div>
    <h2>Languages</h2>
    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <div>
      <img className="flag" src={country.flag} alt={country.name} />
    </div>
  </>
);

export default Country;
