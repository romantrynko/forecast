import axios from "axios";
import { API_KEY } from './configs';

const instance = axios.create({ baseURL: 'http://api.openweathermap.org' });

instance.interceptors.request.use((config) => {
  config.params = { ...config.params, appid: API_KEY };
  return config;
});

export default instance
