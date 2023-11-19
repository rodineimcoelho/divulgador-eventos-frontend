import { AuthContext } from '@/context/AuthContext';
import axios, { isAxiosError } from 'axios';
import { useContext } from 'react';
import { Cookies } from 'react-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export function useApi() {
  const { authenticate } = useContext(AuthContext);

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data.message as string[];
        const url = error.response?.config.url;

        if (
          status === 401 &&
          url !== 'auth/refresh' &&
          message.includes('invalid or expired token')
        ) {
          await authenticate();
          return axios.request(error.config!);
        }
      }

      return Promise.reject(error);
    }
  );

  const cookieStore = new Cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
