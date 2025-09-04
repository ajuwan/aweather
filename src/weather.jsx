import React, { useState, useEffect } from 'react';
import './weather.css';

// ✅ Weather image import
import sunny from './assets/weather-icon/day.svg';
import rainy from './assets/weather-icon/rainy-1.svg';
import cloudy from './assets/weather-icon/cloudy.svg';
import snowy from './assets/weather-icon/snowy-4.svg';
import thunder from './assets/weather-icon/thunder.svg';

export default function Weather({ onWeatherUpdate }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Async function to fetch weather data
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=punjab,IN&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error('Server is not in mood 😅');
      }

      const data = await res.json();
      setWeather(data);
      setLoading(false);

      if (onWeatherUpdate) {
        onWeatherUpdate(data.weather[0].main); // "Rain", "Clear", etc.
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // ✅ Fetch on component mount
  useEffect(() => {
    fetchWeather(); // <-- just call, don't await
    const interval = setInterval(fetchWeather, 60000); // Fetch every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // ✅ Function to get weather image based on condition
  const getWeatherImage = () => {
    if (!weather) return sunny; // Default image if no weather data
    switch (weather.weather[0].main) {
      case 'Clear':
        return sunny;
      case 'Rain':
        return rainy;
      case 'Clouds':
        return cloudy;
      case 'Snow':
        return snowy;
      case 'Thunderstorm':
        return thunder;
      default:
        return sunny; // fallback
    }
  };

  // ✅ Loading UI
  if (loading) return <p>Loading...</p>;

  // ✅ Error UI with retry
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchWeather}>Retry</button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '30%',
        height: '20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
      }}
    >
      <div className="weather-box draggable">
        <div className="temp-display">
          {Math.round(weather?.main?.temp)}
          <span
            style={{
              fontSize: '1.2rem',
              marginBottom: '10rem',
              color: '#ffffffff',
            }}
          >
            °C
          </span>
        </div>
      </div>
    </div>
  );
}
