import React, { useEffect, useState } from "react";
import { useWeatherUnit } from "../Contexts/WeatherContext";
import "../App.css";

const API_KEY = "190774ba47fa9865df3d765795e32d5d";

export default function Proj3() {
  const { unit, toggleUnit } = useWeatherUnit();
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Location error");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchWeather(query);
  }, [query, unit]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        fetchWeather(query); 
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setQuery(city.trim());
      setCity("");
    }
  };

  return (
    <div className="weather-container">
      <h1 className="mb-4">Project 3: <br />Weather App 🌦️ </h1>

      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          value={city}
          className="form-control mb-2"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="btn btn-primary me-2">Search</button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={toggleUnit}
        >
          Show in {unit === "metric" ? "°F" : "°C"}
        </button>
      </form>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : weather ? (
        <div className="weather-box card p-3">
          <h3>{weather.name}</h3>
          <p>
            Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
