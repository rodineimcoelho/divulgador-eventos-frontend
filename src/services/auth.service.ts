import UserDto from '@/dto/user.dto';
import { useApi } from './api';

type SignInRequestData = {
  email: string;
  password: string;
};

type AuthResponseData = {
  user: UserDto;
  access_token: string;
  refresh_token: string;
};

export function useAuthService() {
  const api = useApi();

  async function signIn(data: SignInRequestData): Promise<AuthResponseData> {
    return (await api.post('/auth/login', data)).data;
  }

  async function refresh(refreshToken: string): Promise<AuthResponseData> {
    return (await api.post('/auth/refresh', { refresh_token: refreshToken }))
      .data;
  }

  return { signIn, refresh };
}
