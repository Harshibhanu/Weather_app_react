
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '././index.css';
// import logo from '././logo.png';

// const FavoriteCities = ({ favoriteCities, removeFavoriteCity }) => {
//   const navigate = useNavigate();

//   const handleCityClick = (city) => {
//     navigate(`/city/${encodeURIComponent(city)}`);
//   };

//   return (
//     <>
//       <header className="App-header">
//         <img src={logo} alt="Logo" height={'150px'} width={'150px'} style={{ padding: '10px' }} />
//       </header>
//       <div>
//         <div className='arrow'>
//           <Link to="/" style={{ marginLeft: '40px' }}>
//             <FontAwesomeIcon icon={faArrowLeft} className='back-link' size='1x' />
//           </Link>
//           <p style={{ padding: '20px', color: 'blue', fontSize: '24px' }}>Favorite Cities</p>
//         </div>
//         <div className="card-list">
//           <ul>
//             {favoriteCities.map((city, index) => (
//               <li key={index} className="card-item" style={{ textAlign: 'center' }}>
//                 <div className="card-content">
//                   <span onClick={() => handleCityClick(city)} style={{ cursor: 'pointer', marginRight: '10px' }}>
//                     {city}
//                   </span>
//                   <button onClick={() => removeFavoriteCity(city)}>Remove</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FavoriteCities;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import logo from './logo.png';

const FavoriteCities = ({ favoriteCities, removeFavoriteCity }) => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate(`/city/${encodeURIComponent(city)}`);
  };

  return (
    <>
      <header className="App-header">
        <img src={logo} alt="Logo" height={'150px'} width={'150px'} style={{ padding: '10px' }} />
      </header>
      <div>
        <div className='arrow'>
          <Link to="/" style={{ marginLeft: '40px' }}>
            <FontAwesomeIcon icon={faArrowLeft} className='back-link' size='1x' />
          </Link>
          <p style={{ padding: '20px', color: 'blue', fontSize: '24px' }}>Favorite Cities</p>
        </div>
        <div className="card-list">
          <ul>
            {favoriteCities.map((city, index) => (
              <li key={index} className="card-item" style={{ textAlign: 'center' }}>
                <div className="card-content">
                  <span onClick={() => handleCityClick(city)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                    {city}
                  </span>
                  <button onClick={() => removeFavoriteCity(city)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FavoriteCities;




