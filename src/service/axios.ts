import axios from 'axios';
import toast from "react-hot-toast";

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

ax.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error?.response?.data?.message ?? 'An error has occured');
    return Promise.reject(error);
  }
)

export default ax;
