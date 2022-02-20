import axios from 'axios';
import ServiceTypes from './types';

export const AxiosClient = axios.create({
  baseURL: ServiceTypes.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);
