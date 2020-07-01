import React from "react";
import CountryLink from "./CountryLink";

const Countries = ({ countries, handleCountryLinkClick }) => (
  <>
    {countries.map((country) => (
      <CountryLink key={country.alpha2Code} country={country} handleCountryLinkClick={handleCountryLinkClick} />
    ))}
  </>
);

export default Countries;
