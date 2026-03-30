import axios from 'axios';
import { env } from '@/configs/env';

export const identityClient = axios.create({
  baseURL: env.VITE_AUTH_API
});

export const setupAuthInterceptors = (getToken: () => string | null) => {
  identityClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};
