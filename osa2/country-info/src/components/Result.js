import React from "react";
import Country from "./Country";
import Countries from "./Countries";

const Result = ({
  countryInfo,
  handleCountryLinkClick,
  weatherInfo,
  setWeatherInfo,
}) => {
  if (countryInfo.length === 1) {
    return (
      <>
        <Country
          country={countryInfo[0]}
          weatherInfo={weatherInfo}
          setWeatherInfo={setWeatherInfo}
        />
      </>
    );
  }
  if (countryInfo.length === 0) {
    return <div>No matching countries.</div>;
  }
  if (countryInfo.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }
  return (
    <Countries
      countries={countryInfo}
      handleCountryLinkClick={handleCountryLinkClick}
    />
  );
};

export default Result;
