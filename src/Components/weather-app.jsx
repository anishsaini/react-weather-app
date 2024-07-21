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
  const [weather, setWeather] = useState(false);

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
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className="Weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">{weather.temprature}°C</p>
      <p className="location">{weather.location}</p>
      <div className="weather_data">
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
            <p>{weather.windSpeed}km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
