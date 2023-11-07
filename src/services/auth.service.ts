import { User } from '@/types/User';
import { api } from './api';

type SignInRequestData = {
  email: string;
  password: string;
};

type AuthResponseData = {
  user: User;
  access_token: string;
  refresh_token: string;
};

class AuthService {
  async signIn(data: SignInRequestData): Promise<AuthResponseData> {
    return (await api.post('/auth/login', data)).data;
  }

  async refresh(refreshToken: string): Promise<AuthResponseData> {
    return (await api.post('/auth/refresh', { refresh_token: refreshToken }))
      .data;
  }
}

export default new AuthService();
