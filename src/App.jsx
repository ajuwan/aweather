import React, { useState } from 'react';
import DateTimeDisplay from './D&t';
import Weather from './weather';

// 🎥 Import multiple videos for different weathers
import SunnyVideo from './assets/video/Sunny.mp4';
import rainyVideo from './assets/video/Rain.mp4';
import cloudyVideo from './assets/video/cloudy.mp4';
import defaultVideo from './assets/video/Sunny.mp4';

import './App.css';

function App() {
  const [weatherDesc, setWeatherDesc] = useState(""); // ✅ store weather

  // ✅ Pick background video based on weather
  const getBackgroundVideo = () => {
    switch (weatherDesc) {
      case "Clear":
        return SunnyVideo;
      case "Rain":
        return rainyVideo;
      case "Clouds":
        return cloudyVideo;
      default:
        return defaultVideo;
    }
  };

  return (
    <>
      <video autoPlay loop muted className="background-video">
        <source src={getBackgroundVideo()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="App">
        <DateTimeDisplay />
      </div>

      <div className="weather-container">
        {/* ✅ Pass callback to Weather */}
        <Weather onWeatherUpdate={setWeatherDesc} />
      </div>
    </>
  );
}

export default App;
