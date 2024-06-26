// utils.js
import { faArrowUp, faArrowRight, faArrowDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloud,
  faCloudShowersHeavy,
  faCloudRain,
  faPooStorm,
  faSnowflake,
  faSmog
} from '@fortawesome/free-solid-svg-icons';

const faArrowUpRight = { icon: faArrowUp, rotation: 45 };
const faArrowDownRight = { icon: faArrowDown, rotation: 45 };
const faArrowDownLeft = { icon: faArrowDown, rotation: -45 };
const faArrowUpLeft = { icon: faArrowUp, rotation: -45 };

export const getWindDirectionIcon = (angle) => {
    if (angle >= 337.5 || angle < 22.5) {
        return { icon: faArrowUp, rotation: 0 }; 
    } else if (angle >= 22.5 && angle < 67.5) {
        return faArrowUpRight; 
    } else if (angle >= 67.5 && angle < 112.5) {
        return { icon: faArrowRight, rotation: 0 };
    } else if (angle >= 112.5 && angle < 157.5) {
        return faArrowDownRight; 
    } else if (angle >= 157.5 && angle < 202.5) {
        return { icon: faArrowDown, rotation: 0 }; 
    } else if (angle >= 202.5 && angle < 247.5) {
        return faArrowDownLeft; 
    } else if (angle >= 247.5 && angle < 292.5) {
        return { icon: faArrowLeft, rotation: 0 }; 
    } else if (angle >= 292.5 && angle < 337.5) {
        return faArrowUpLeft; 
    } else {
        return { icon: faArrowUp, rotation: 0 }; 
    }
};


  export const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': faSun,
      '01n': faMoon,
      '02d': faCloudSun,
      '02n': faCloudMoon,
      '03d': faCloud,
      '03n': faCloud,
      '04d': faCloud,
      '04n': faCloud,
      '09d': faCloudShowersHeavy,
      '09n': faCloudShowersHeavy,
      '10d': faCloudRain,
      '10n': faCloudRain,
      '11d': faPooStorm,
      '11n': faPooStorm,
      '13d': faSnowflake,
      '13n': faSnowflake,
      '50d': faSmog,
      '50n': faSmog
    };
  
    return iconMap[iconCode] || faSun; 
  };
 

  
  export const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  export const formatShortDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(date);
  };

  export function airqualityDes(airquality) {
    if (airquality === 1) {
        return 'Good';
    } else if (airquality === 2) {
        return 'Fair';
    } else if (airquality === 3) {
        return 'Moderate';
    } else if (airquality === 4) {
        return 'Poor';
    } else if (airquality === 5) {
        return 'Very Poor';
    } else {
        return 'Unknown';
    }
}
