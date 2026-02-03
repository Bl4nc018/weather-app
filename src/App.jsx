import { useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "YOUR_API_KEY"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`

  const searchLocation = (event) => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error obteniendo el tiempo:", error);
    });

    setLocation("");
  }


  return (
    <div className="app">
      
    </div>
  )
}

export default App
