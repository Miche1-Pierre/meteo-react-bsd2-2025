import React from "react";
import Card from "./Card.jsx";
import "./assets/css/cardContainer.css";

const CardContainer = ({ weather }) => {
  const cards = weather.hourly.time.map((time, index) => (
    <Card
      key={time}
      time={time}
      temperature={weather.hourly.temperature_2m[index]}
      weatherCode={weather.hourly.weather_code[index]}
    />
  ));

  return <div className="grid grid-cols-1 bg-white px-[50px] py-[25px] rounded-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{cards}</div>;
};

export default CardContainer;