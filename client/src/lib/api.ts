import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const api = (endpoint: string) => {
  const config = axios.create({
    baseURL: `${VITE_API_URL}/api/${endpoint}`,
    withCredentials: true
  });
  return config;
}

export default api;