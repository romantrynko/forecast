import React from 'react';
import './WeatherDisplay.css';

export default function WeatherDisplay({ location }) {
  if (!location) return null;
  const {
    name,
    clouds: { all },
    main: {
      feels_like,
      grnd_level,
      humidity,
      pressure,
      temp,
      temp_max,
      temp_min
    },
    sys: { country },
    visibility,
    wind: { speed }
  } = location;

  return (
    <div className="weather-container">
      <div className="weather-header">
        <div className="location-name">
          <h1>
            {name} {country}
          </h1>
        </div>
        <div className="temperature">
          <div className="temp">Temperature: {temp}</div>
          <div className="feels-like">Fells Like: {feels_like}</div>
        </div>
      </div>

      <div className="weather-body">
        <div className="row">
          <div className="clouds el-block">
            <h4>Clouds: </h4>
            {all}
          </div>

          <div className="ground-level el-block">
            <h4>Ground level:</h4>
            {grnd_level}
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
