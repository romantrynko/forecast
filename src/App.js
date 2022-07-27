import { useCallback, useState } from 'react';
import './App.css';
import axios from './axios';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import { debounce } from './utils';

function App() {
  const [locationWeather, setLocationWeather] = useState();
  const [error, setError] = useState('');

  const getWeather = useCallback(async (e) => {
    const cityName = e.target.value;
    const limit = 3;

    if (!cityName) {
      setLocationWeather();
      setError();
      return;
    }

    try {
      const location = await axios.get(
        `/geo/1.0/direct?q=${cityName}&limit=${limit}`
      );
      if (location.data.length === 0) {
        setError('Wrong location');
        setLocationWeather();
        return;
      }
      const weather = await axios.get(
        `/data/2.5/weather?lat=${location.data[0].lat}&lon=${location.data[0].lon}`
      );
      setLocationWeather(weather.data);
      setError('');
      console.log(location.data);
    } catch (error) {
      console.error("didn't get weather", error);
    }
  }, []);

  const handleWeather = useCallback(
    () => debounce(getWeather, 500),
    [getWeather]
  );

  return (
    <div className="App">
      <div className="forecast-form-container">
        <div className="forecast-header">
          <h1>Weather forecast</h1>
        </div>
        <form className="forecast-form" onChange={handleWeather()}>
          <input
            type="text"
            className="forecast-input"
            placeholder="Enter location"
          />
        </form>
        {error && <h4>{error}</h4>}
      </div>
      {locationWeather && <WeatherDisplay location={locationWeather} />}
    </div>
  );
}

export default App;
