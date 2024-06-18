import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot, faWind, faSun, faMoon, faDroplet, faWater, faEye, faTemperatureQuarter } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { faArrowUp, faArrowUpRight, faArrowRight, faArrowDownRight, faArrowDown, faArrowDownLeft, faArrowLeft, faArrowUpLeft } from '@fortawesome/free-solid-svg-icons';
import { getWeatherIcon, formatDate,formatShortDate, airqualityDes,getWindDirectionIcon } from './utils';
const WeatherDisplay = ({ weatherData, forecastData, airPollutionData,addFavoriteCity,searchedCity }) => {
  
  const groupForecastByDate = (forecastList) => {
    const groupedForecast = {};
    forecastList.forEach(forecast => {
      const date = formatDate(new Date(forecast.dt * 1000));
      if (!groupedForecast[date]) {
        groupedForecast[date] = forecast;
      }
    });
    return groupedForecast;
  };

  // Group forecast data by date and get first temperature entry
  const groupedForecast = groupForecastByDate(forecastData.list);
  const getWindDirectionStyle = (deg) => {
    return { transform: `rotate(${deg}deg)` };
  };
  const handleAddFavoriteCity = (city) => {
    addFavoriteCity(city);
    toast.success('Added to favorite cities!', {
      position: "top-right"
    });
  };
 
  return (
    <>
    
  
        
    <div>
    <div className="flex">
      <div className="current-weather space-y-4 alpha-4">
        <b>Now</b>
        <div className="current-degree">
          <p className="text-7xl">{weatherData.main.temp}<sup>o<sub>c</sub></sup></p>
          <FontAwesomeIcon icon={getWeatherIcon(weatherData.weather[0].icon)} size="3x" />
        </div>
        <p className="weatherdes">{weatherData.weather[0].description}</p>
        <hr/>
        <ul>
          <li className="des">
            <span><FontAwesomeIcon icon={faCalendar} /></span>
            <p className="current-date">{formatDate(new Date())}</p>
          </li>
          <li className="des mt">
            <span><FontAwesomeIcon icon={faLocationDot} /></span>
            <p >{weatherData.name}</p>
          </li>
        </ul>
        <button onClick={() => handleAddFavoriteCity(searchedCity)}>Add to Favorites</button>
        
      </div>
      <div className="airqua">
        <div className="main-div-of-right">
          <div className="box-left">
            <div className="flex-gap-360px">
              <p className="index">Air Quality Index</p>
              <span className="span">{airqualityDes(airPollutionData.list[0].main.aqi)}</span>
            </div>
            <div className="air-values">
            <FontAwesomeIcon icon={faWind} size="3x" />
              <div className="grid2">
                <div>
                  <p className="text-2xl pb-2 ">PM2.5</p>
                  <p className="text-5xl pm">{airPollutionData.list[0].components.pm2_5}</p>
                </div>
                <div>
                  <p className="text-2xl pb-2">SO2</p>
                  <p className="text-5xl so2">{airPollutionData.list[0].components.so2}</p>
                </div>
                <div>
                  <p className="text-2xl pb-2">NO2</p>
                  <p className="text-5xl no2">{airPollutionData.list[0].components.no2}</p>
                </div>
                <div>
                  <p className="text-2xl pb-2">O3</p>
                  <p className="text-5xl o3">{airPollutionData.list[0].components.o3}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-right w-500px">
            <div>
              <p className="index">Sunrise & Sunset</p>
            </div>
            <div className="flex2">
            <FontAwesomeIcon icon={faSun} size="3x" />
              <div>
                <p className="text-2xl pb-3">Sunrise</p>
                <p className="text-5xl rise">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              </div>
              <FontAwesomeIcon icon={faMoon} size="3x" />
              <div>
                <p className="text-2xl pb-3">Sunset</p>
                <p className="text-5xl set">{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-grid">
    <div class="back p w-220">
    <p className='pb-10'>Humidity</p>
    <div class="flex-gap60"><FontAwesomeIcon icon={faDroplet} size="2x" /><p class=" humidity">{weatherData.main.humidity}%</p></div>
</div>
<div class="back w-240 p">
    <p class="pb-10">Pressure</p>
    <div class="pressure1"><FontAwesomeIcon icon={faWater} size="2x" /><p class=" pressure">{weatherData.main.pressure}<sub>hpa</sub></p></div>
</div>
<div class="back w-220 p">
    <p class="pb-10">Visibility</p>
    <div class="flex-gap60"><FontAwesomeIcon icon={faEye} size="2x" /><p class="visibility">{weatherData.visibility/1000}<sub>km</sub></p></div>
</div>
<div class="back w-230 p">
    <p class="pb-10">Feels Like</p>
    <div class="flex-gap60"><FontAwesomeIcon icon={faTemperatureQuarter} size="2x" /> <p class="text-5xl p-2 feels">{weatherData.main.feels_like}<sup>o<sub>c</sub></sup></p></div>
</div>
</div>
    
      </div>
     
    </div>
    <p className='days5'>5 days forecast</p>
    <p class='today'>Today at</p>
    <div className="parent-container">
    
    <div className="forecast-container1">
    {Object.keys(groupedForecast).map((date, index) => (
        <div key={index} className="forecast-item1">
          <FontAwesomeIcon icon={getWeatherIcon(groupedForecast[date].weather[0].icon)} size="2x" />
          <p className="forecast-temp1">{groupedForecast[date].main.temp}°C</p>
          <div className="forecast-details">
            <p className="forecast-day">{formatDate(new Date(groupedForecast[date].dt * 1000), 'dddd')}</p>
            
          </div>
        </div>
      ))}
        </div>
       <div className='grids'>
    <div className="grid3">
      {forecastData.list.slice(0, 8).map((forecast, index) => (
        <div key={index} className="forecast-item temp">
          <p className="forecast-time text-2xl">{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
          <FontAwesomeIcon icon={getWeatherIcon(forecast.weather[0].icon)} className="fa-2x" />
          <p className="forecast-temp text-2xl">{forecast.main.temp}<sup>o<sub>c</sub></sup></p>
        </div>
      ))}
    </div>
    <div className="grid3">
    {forecastData.list.slice(0, 8).map((forecast, index) => {
                            const { icon, rotation } = getWindDirectionIcon(forecast.wind.deg);
                            return (
                                <div key={index} className="forecast-item temp">
                                    <p className="forecast-time text-2xl">{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                                    <FontAwesomeIcon icon={icon} size="2x" style={{ transform: `rotate(${rotation}deg)` }} />
                                    <p className="forecast-temp">{forecast.wind.speed} km/h</p>
                                </div>
                            );
                        })}
    </div>
    </div>
  </div>
  </div>
  
  </>
  );
};


export default WeatherDisplay;


