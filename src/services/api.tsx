import { AuthContext } from '@/context/AuthContext';
import axios, { isAxiosError } from 'axios';
import { useContext } from 'react';
import { Cookies } from 'react-cookie';

export function useApi() {
  const { signOut } = useContext(AuthContext);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  });

  api.interceptors.request.use(
    (response) => response,
    (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data.message as string[];

        if (status === 401 && message.includes('invalid or expired token'))
          return signOut();
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
