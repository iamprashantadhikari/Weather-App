import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import SearchImg from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import { toast } from 'react-toastify'

const Weather = () => {

  const searchRef = useRef();
  const [weatherData, setWeatherData] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  const search = async (city) => {
    if(city == "") {
      toast.warn("Please enter a city name")
      // alert("Please enter a city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      if(data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || clear_icon
        setWeatherData({
          humidity: data.main.humidity,
          wind: data.wind.speed,
          temp: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })
      } else {
        // setWeatherData(false)
        toast.error(data.message)
      }
    } catch (error) {
      setWeatherData(false)
      setErrorMsg("Something went wrong!")
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    search('Kathmandu');
  }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={searchRef} type="text" placeholder='Search...' />
            <img src={SearchImg} alt="" 
            onClick={() => search(searchRef.current.value)}
            />
        </div>
        {weatherData?<>
        {/* <div className="weather-details"> */}
          <img src={weatherData.icon} alt="" className='weather-icon'/>
          <p className='temperature'>{weatherData.temp}°C</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <p className='humidity'>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <p className='wind'>{weatherData.wind} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        {/* </div> */}
        </>:<>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        </>}

    </div>
  )
}

export default Weather