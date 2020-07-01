import React from "react";

const CountryLink = ({ country, handleCountryLinkClick }) => (
  <div key={country.alpha2Code}>
    {country.name}
    <button onClick={handleCountryLinkClick} value={country.name}>
      Show
    </button>
  </div>
);

export default CountryLink;
