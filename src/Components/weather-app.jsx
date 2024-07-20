import "../App.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import drizzle_icon from "../assets/drizzle.png";
const Weatherapp = () => {
  return (
    <div className="Weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter city name" />
        <img src={search_icon} alt="" />
      </div>
      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">16°C</p>
      <p className="description">Clear</p>
      <div className="weather_data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>3.6 km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
