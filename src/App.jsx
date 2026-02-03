import { useState } from 'react'
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "YOUR_API_KEY"; // Reemplaza con tu propia API key de OpenWeatherMap.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error obteniendo el tiempo:", error);
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
          placeholder='Enter Location'
          type="text"
        />
      </div>

      <div className="container"> 
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like - 273.15)}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default App
