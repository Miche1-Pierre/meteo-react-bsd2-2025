import React, { useState, useEffect } from "react";
import useQueryWeather from "./useQueryWeather.js";
import CardContainer from "./CardContainer.jsx";
import Button from "./Button.jsx";

import "./assets/css/app.css";

function App() {
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const { data: weather, isLoading, refetch } = useQueryWeather(day);

  useEffect(() => {
    refetch();
  }, [day]);

  const previous = () => {
    const newDay = new Date(day);
    newDay.setDate(newDay.getDate() - 1);
    setDay(newDay.toISOString().split("T")[0]);
  };

  const next = () => {
    const newDay = new Date(day);
    newDay.setDate(newDay.getDate() + 1);
    setDay(newDay.toISOString().split("T")[0]);
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-screen bg-[#6C8EAD]">
        Loading...
      </main>
    );
  }

  return (
    <main className="h-screen bg-[#6C8EAD]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl text-white font-bold">Weather App</h1>
        </header>
        <div className="mb-8">
          <h2 className="text-xl text-white mb-2">
            Location : {weather.latitude}, {weather.longitude}
          </h2>
          <h3 className="text-xl text-white mb-2">
            Timezone : {weather.timezone}
          </h3>
          <h3 className="text-xl text-white mb-4">
            Voici la météo du : {new Date(day).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>
          <Button previousDate={previous} nextDate={next} />
        </div>
        <CardContainer weather={weather} />
      </div>
    </main>
  );
}

export default App;
