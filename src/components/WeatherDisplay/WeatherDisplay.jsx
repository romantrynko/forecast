import React, { useEffect, useState } from 'react';
import './WeatherDisplay.css';
import cloudy from '../../assets/cloudy.png';
import partly_cloudy from '../../assets/partly-cloudy.png';
import sun from '../../assets/sun.png';

export default function WeatherDisplay({ location }) {
  const [cloudIcon, setCloudIcon] = useState(sun);

  useEffect(() => {
    if (location.clouds.all >= 70) {
      setCloudIcon(cloudy);
    } else if (location.clouds.all > 10 && location.clouds.all < 70) {
      setCloudIcon(partly_cloudy);
    } else {
      setCloudIcon(sun);
    }
  }, [location.clouds.all]);

  const {
    name,
    clouds: { all },
    main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
    sys: { country },
    visibility,
    wind: { speed }
  } = location;

  console.log(location);

  return (
    <div className="weather-container">
      <div className="weather-header">
        <div className="location-name">
          <h1>
            {name}, {country}
          </h1>
        </div>
        <div className="temperature">
          <div className="temp">
            <p>Temperature:</p> {temp}
          </div>
          <div className="temp">
            <p>Fells Like:</p> {feels_like}
          </div>
        </div>
      </div>

      <div className="weather-body">
        <div className="row">
          <div className="clouds el-block">
            <h4>Clouds: </h4>
            <img src={cloudIcon} alt="clouds" />
            {all}%
          </div>

          <div className="humidity el-block">
            <h4>Humidity:</h4>
            {humidity}%
          </div>
        </div>

        <div className="row">
          <div className="pressure el-block">
            <h4>Pressure: </h4>
            {pressure}
          </div>
          <div className="temp-max el-block">
            <h4>Max temp:</h4> {temp_max}
          </div>
          <div className="temp-min el-block">
            <h4>Min temp:</h4> {temp_min}
          </div>
        </div>
        <div className="row">
          <div className="visibility el-block">
            <h4>Visibility:</h4> {visibility}
          </div>
          <div className="wind-speed el-block">
            <h4>Wind speed:</h4> {speed}
          </div>
        </div>
      </div>
    </div>
  );
}
