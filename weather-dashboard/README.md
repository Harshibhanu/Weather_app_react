# Weather_app_react
A weather application built with React that provides current weather, forecast, and air quality data. Users can search for weather information by city, view detailed weather forecasts, and manage a list of favorite cities.

Features
.Search for weather information by city
.View current weather, 5-day forecast, and air quality data
.Add and remove favorite cities
.View weather information for favorite cities
.Loading indicator for data fetching

Requirements
.Node.js
.npm (Node Package Manager)
.An API key from OpenWeatherMap

Getting Started
1. Clone the Repository
git clone https://github.com/Harshibhanu/Weather_app_react.git
cd weather-app
2. Install Dependencies
npm install
3. Obtain an OpenWeatherMap API Key
Visit the OpenWeatherMap website and sign up for an account.
Once registered, navigate to the API Keys section of your account.
Generate a new API key.

5. Start the JSON Server
The application uses a JSON server to store favorite cities. Start the JSON server by creating a seperate folder in desktop and deploy it in render to use that link in weather app

6. Start the Development Server
npm start

Project Structure

src/: React components used in the application.
App.js: Main application component managing routes and state and for fetching weather data for a specific city.

Search.js: Component for the search bar and favorite cities link.

WeatherDisplay.js: Component for displaying weather, forecast, and air quality data.

Loader.js: Loading spinner component.

FavoriteCities.js: Component for displaying and managing favorite cities.

utils/: Utility functions for formatting data and mapping weather icons.

index.js: Entry point for the React application.

index.css: Global styles for the application.
