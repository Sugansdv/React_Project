import React, { createContext, useContext, useState } from "react";

const WeatherUnitContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <WeatherUnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </WeatherUnitContext.Provider>
  );
};

export const useWeatherUnit = () => useContext(WeatherUnitContext);
