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

    if (!cityName) {
      setLocationWeather();
      setError();
      return;
    }

    try {
      const weather = await axios.get(`/data/2.5/weather?q=${cityName}`);
      setLocationWeather(weather.data);
      setError('');
      console.log(weather.data);
    } catch (error) {
      setError('Wrong location');
      console.error('Wrong location!', error);
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
      </div>
      {locationWeather && !error ? (
        <WeatherDisplay location={locationWeather} />
      ) : (
        <h1 className="error">{error}</h1>
      )}
    </div>
  );
}

export default App;
