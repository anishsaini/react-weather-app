import "../App.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import drizzle_icon from "../assets/drizzle.png";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Weatherapp = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": drizzle_icon,
    "02n": drizzle_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": snow_icon,
    "11n": snow_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": snow_icon,
    "50n": snow_icon,
  };

  const search = async (city) => {
    if (!city) return;
    
    try {
      setError(null);
      const apiKey = import.meta.env.VITE_APP_ID;
      console.log('API Key:', apiKey);
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      console.log('API URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
        pressure: data.main.pressure,
        visibility: (data.visibility / 1000).toFixed(1), // Convert to km
        maxTemp: Math.floor(data.main.temp_max),
        minTemp: Math.floor(data.main.temp_min),
        country: data.sys.country,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  const handleSearch = () => {
    const city = inputRef.current.value.trim();
    if (city) {
      search(city);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="Weather">
      <div className="search-bar">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Enter city name" 
          onKeyPress={handleKeyPress}
        />
        <img
          src={search_icon}
          alt=""
          onClick={handleSearch}
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      
      {weather && (
        <>
          <div className="weather-main">
            <img src={weather.icon} alt="" className="weather-icon" />
            <div className="temperature-container">
              <p className="temperature">{weather.temprature}°C</p>
              <p className="feels-like">Feels like: {weather.feelsLike}°C</p>
            </div>
            <p className="location">{weather.location}, {weather.country}</p>
            <p className="description">{weather.description}</p>
          </div>

          <div className="weather-details">
            <div className="detail-row">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weather.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weather.windSpeed} km/h</p>
                  <span>Wind speed</span>
                </div>
              </div>
            </div>

            <div className="detail-row">
              <div className="col">
                <div>
                  <p>{weather.pressure} hPa</p>
                  <span>Pressure</span>
                </div>
              </div>
              <div className="col">
                <div>
                  <p>{weather.visibility} km</p>
                  <span>Visibility</span>
                </div>
              </div>
            </div>

            <div className="detail-row">
              <div className="col">
                <div>
                  <p>{weather.maxTemp}°C</p>
                  <span>Max Temp</span>
                </div>
              </div>
              <div className="col">
                <div>
                  <p>{weather.minTemp}°C</p>
                  <span>Min Temp</span>
                </div>
              </div>
            </div>

            <div className="detail-row">
              <div className="col">
                <div>
                  <p>{weather.sunrise}</p>
                  <span>Sunrise</span>
                </div>
              </div>
              <div className="col">
                <div>
                  <p>{weather.sunset}</p>
                  <span>Sunset</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weatherapp;
