
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Search from './search';
import WeatherDisplay from './weatherdisplay';
import FavoriteCities from './favorites';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loader from './loading';

library.add(fas);

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const jsonServerUrl = 'https://json-server-25as.onrender.com/api/favoritecities';

  useEffect(() => {
    const fetchFavoriteCities = async () => {
      try {
        const response = await axios.get(jsonServerUrl);
        setFavoriteCities(response.data.map(item => item.city));
      } catch (error) {
        console.error('Error fetching favorite cities:', error);
      }
    };
    fetchFavoriteCities();
  }, []);

  const getWeatherData = async (city) => {
    setLoading(true); 
    const apiKey = 'fb1edf8562680d21e4a6f7cb83c8847b';
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const geoResponse = await axios.get(geocodingUrl);
      const geoData = geoResponse.data;
      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([
          axios.get(weatherUrl),
          axios.get(forecastUrl),
          axios.get(airPollutionUrl)
        ]);

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
        setAirPollutionData(airPollutionResponse.data);
        setSearchedCity(city);
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const addFavoriteCity = async (city) => {
    if (!favoriteCities.includes(city)) {
      try {
        await axios.post(jsonServerUrl, { city });
        setFavoriteCities([...favoriteCities, city]);
      } catch (error) {
        console.error('Error adding favorite city:', error);
      }
    }
  };


  const removeFavoriteCity = async (city) => {
    try {
      const response = await axios.get(jsonServerUrl);
      const cityToDelete = response.data.find(item => item.city === city);
      if (cityToDelete) {
        await axios.delete(`${jsonServerUrl}/${cityToDelete.id}`);
        setFavoriteCities(favoriteCities.filter(favCity => favCity !== city));
      }
    } catch (error) {
      console.error('Error removing favorite city:', error);
    }
  };

  return (
    <Router>
      <div>
        <ToastContainer />
        {loading ? <Loader /> : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search getWeatherData={getWeatherData} />
                  {weatherData && forecastData && airPollutionData &&
                    <WeatherDisplay
                      weatherData={weatherData}
                      forecastData={forecastData}
                      airPollutionData={airPollutionData}
                      addFavoriteCity={addFavoriteCity}
                      searchedCity={searchedCity}
                    />}
                </>
              }
            />
            <Route
              path="/favorites"
              element={<FavoriteCities favoriteCities={favoriteCities} removeFavoriteCity={removeFavoriteCity} />}
            />
            <Route
              path="/city/:cityName"
              element={<CityWeather getWeatherData={getWeatherData} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

const CityWeather = ({ getWeatherData }) => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (cityName) {
      getWeatherData(cityName);
      navigate('/');
    }
  }, [cityName, getWeatherData, navigate]);

  return null;
};

export default App;
