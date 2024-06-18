import React, { useState } from 'react';
import logo from '../src/logo.png'
import '././index.css'
import { Link } from 'react-router-dom';

const Search = ({ getWeatherData,loading }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    getWeatherData(city);
  };

  return (
    <>
   
    <div className='collab'>
      <div><img src={logo} height={'200px'} width={'200px'}></img></div>
    <div className="search-bar">
      <input className='input'
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      {/* <button onClick={handleSearch} className='button'>Search</button> */}
      <button onClick={handleSearch} className='button' disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
         
          
      
    </div>
    <Link to="/favorites" style={{ backgroundColor:'darkgoldenrod',borderRadius:'20px', padding:'15px', fontSize: '15px',whiteSpace:'nowrap' }}>Favorite Cities</Link>
    </div>
    </>
  );
};

export default Search;
