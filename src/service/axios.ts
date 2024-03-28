import axios from 'axios';

const ax = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

ax.interceptors.request.use(
  async (configuration) => {
    configuration.headers['Content-Type'] = 'application/json';
    // configuration.headers['x-api-key'] = Config.API_KEY;
    return configuration;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default ax;
