import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Result from "./components/Result";

const COUNTRY_INFO_URL = "https://restcountries.eu/rest/v2/all";

const filterCountries = (searchString, countryInfo) => {
  if (searchString.length === 0) {
    return countryInfo;
  }
  const cleanedSearchString = searchString
    .replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")
    .toLowerCase();
  const partialMatch = countryInfo.filter((country) =>
    country.name.toLowerCase().match(new RegExp(cleanedSearchString))
  );
  if (partialMatch.length > 1) {
    const exactMatch = partialMatch.filter(
      (country) => country.name.toLowerCase() === searchString.toLowerCase()
    );
    if (exactMatch.length === 1) {
      return exactMatch;
    }
  }
  return partialMatch;
};

const App = () => {
  const [countryInfo, setCountryInfo] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    axios
      .get(COUNTRY_INFO_URL)
      .then((response) => setCountryInfo(response.data));
  }, []);

  const filteredCountryInfo = filterCountries(searchString, countryInfo);

  return (
    <>
      <Filter searchString={searchString} setSearchString={setSearchString} />
      <Result
        countryInfo={filteredCountryInfo}
        handleCountryLinkClick={(event) => setSearchString(event.target.value)}
        weatherInfo={weatherInfo}
        setWeatherInfo={setWeatherInfo}
      />
    </>
  );
};

export default App;
