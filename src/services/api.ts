import axios from 'axios';
import { Cookies } from 'react-cookie';

export function getAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  });

  console.log(process.env.NEXT_PUBLIC_API_URL);

  const cookieStore = new Cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

export const api = getAPIClient();
