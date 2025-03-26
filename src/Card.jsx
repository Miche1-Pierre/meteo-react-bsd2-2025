import React from "react";
import "./assets/css/card.css";
import weatherDescriptions from "./weatherDescriptions.json";

const Card = ({ time, temperature, weatherCode }) => {
  const getWeatherInfo = (code) => {
    const weatherInfo = weatherDescriptions[code];
    if (!weatherInfo) return { description: "Unknown", image: "" };

    const isNight = new Date(time).getHours() >= 18 || new Date(time).getHours() < 6;
    return isNight ? weatherInfo.night : weatherInfo.day;
  };

  const { description, image } = getWeatherInfo(weatherCode);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#BECCDA] rounded-lg shadow-lg hover:bg-[#FF3C38] transition">
      <h3 className="text-lg font-semibold">{new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h3>
      <img src={image} alt={description} className="w-16 h-16 my-2" />
      <p className="text-2xl font-bold">{temperature}°C</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Card;