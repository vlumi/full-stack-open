import React from "react";

const Title = ({ city, country }) => (
  <h2>
    Weather in {city}, {country}
  </h2>
);
const Icons = ({ icons }) => (
  <div>
    {icons.map((icon, i) => (
      <img key={i} src={icon} alt="" />
    ))}
  </div>
);
const Temperature = ({ temperature }) => (
  <div>Temperature: {temperature}°C</div>
);
const Wind = ({ speed, direction }) => (
  <div>
    Wind: {speed} km/h, {direction}
  </div>
);

const Weather = ({ country, weatherInfo }) => {
  if (!weatherInfo[country.name]) {
    return <div>No information</div>;
  }
  if (typeof weatherInfo[country.name] === "string") {
    return <div>{weatherInfo[country.name]}</div>;
  }

  const data = weatherInfo[country.name];
  const current = data.current;
  return (
    <>
      <Title city={data.location.name} country={data.location.country} />
      <Temperature temperature={current.temperature} />
      <Icons icons={current.weather_icons} />
      <Wind speed={current.wind_speed} dir={current.wind_dir} />
    </>
  );
};

export default Weather;
