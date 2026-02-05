import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, } from "react-icons/wi";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [cityEs, setCityEs] = useState("");

  const ICONS_BY_MAIN = {
    Clear: WiDaySunny,
    Clouds: WiCloudy,
    Rain: WiRain,
    Drizzle: WiRain,
    Snow: WiSnow,
    Thunderstorm: WiThunderstorm,
    Mist: WiFog,
    Smoke: WiFog,
    Haze: WiFog,
    Dust: WiFog,
    Fog: WiFog,
    Sand: WiFog,
    Ash: WiFog,
    Squall: WiStrongWind,
    Tornado: WiStrongWind,
  };

  const main = data.weather?.[0]?.main; // "Rain", "Clear", etc.
  const WeatherIcon = main ? ICONS_BY_MAIN[main] : null;

  const API_KEY = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=es&appid=${API_KEY}`;

  // Geocoding para obtener local_names.es
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      // 1) Pedimos el nombre en español a Geocoding
      axios
        .get(geoUrl)
        .then((geoRes) => {
          const place = geoRes.data?.[0];

          if (place) {
            // Si existe el nombre en español hace uso de el, en caso contrario, muestra el nombre original
            setCityEs(place.local_names?.es || place.name);
          } else {
            setCityEs("");
          }
        })
        .catch((err) => {
          console.error("Geocoding error:", err);
          setCityEs("");
        });

      // 2) Esta es la llamada original para obtener el clima
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.error("Weather error:", err);
          setData({});
        });

      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{cityEs || data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? (
              <div>
                {WeatherIcon && <WeatherIcon className="weather-icon" />}
                <p>{data.weather[0].description}</p>
              </div>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{Math.round(data.main.feels_like)}°C</p>
              ) : null}
              <p>Sensación térmica</p>
            </div>

            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>

            <div className="wind">
              {data.wind ? (
                <p className="bold">{Math.round(data.wind.speed * 3.6)} km/h</p>
              ) : null}
              <p>Velocidad del viento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
