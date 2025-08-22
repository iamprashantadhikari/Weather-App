import React from 'react'
import './Weather.css'
import SearchImg from '../assets/search.png'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search...' />
            <img src={SearchImg} alt="" />
        </div>
        {/* <div className="weather-details"> */}
          <img src={clear_icon} alt="" className='weather-icon'/>
          <p className='temperature'>16°C</p>
          <p className='location'>London</p>
        {/* </div> */}
    </div>
  )
}

export default Weather