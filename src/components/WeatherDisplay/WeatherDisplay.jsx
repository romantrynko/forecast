import React, { useEffect, useState } from 'react';
import './WeatherDisplay.css';
import cloudy_icon from '../../assets/cloudy.png';
import partly_cloudy_con from '../../assets/partly-cloudy.png';
import sun_icon from '../../assets/sun.png';
import wind_icon from '../../assets/wind.png';
import temperature_icon from '../../assets/thermometer.png';
import pressure_icon from '../../assets/pressure.png';

export default function WeatherDisplay({ location }) {
  const [cloudIcon, setCloudIcon] = useState();

  useEffect(() => {
    if (location.clouds.all >= 70) {
      setCloudIcon(cloudy_icon);
    } else if (location.clouds.all > 10 && location.clouds.all < 70) {
      setCloudIcon(partly_cloudy_con);
    } else {
      setCloudIcon(sun_icon);
    }
  }, [location]);

  const {
    name,
    clouds: { all },
    main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
    sys: { country },
    visibility,
    wind: { speed }
  } = location;

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
            <p>Temperature</p>
            {temp} &#8451;
          </div>
          <div className="temp">
            <p>Feels Like</p>
            {feels_like} &#8451;
          </div>
        </div>
      </div>

      <div className="weather-body">
        <div className="row">
          <div className="clouds el-block">
            <img src={cloudIcon} alt="clouds" />
            {all} %
          </div>

          <div className="humidity el-block">
            <h4>Humidity</h4>
            {humidity} %
          </div>
        </div>

        <div className="row">
          <div className="pressure el-block">
            <img src={pressure_icon} alt="pressure" />
            {pressure} mbar
          </div>
          <div className="temp-max el-block">
            <h4>Max</h4>
            <img src={temperature_icon} alt="temp" />
            {temp_max} &#8451;
          </div>
          <div className="temp-min el-block">
            <h4>Min</h4>
            <img src={temperature_icon} alt="temp" />
            {temp_min} &#8451;
          </div>
        </div>
        <div className="row">
          <div className="visibility el-block">
            <h4>Visibility</h4> {visibility} m
          </div>
          <div className="wind-speed el-block">
            <img src={wind_icon} alt="wind" />
            {speed} m/s
          </div>
        </div>
      </div>
    </div>
  );
}
