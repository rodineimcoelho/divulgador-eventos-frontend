'use client';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useApi } from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useAuthService } from '@/services/auth.service';
import { useCookiesService } from '@/services/cookies.service';
import { useUsersService } from '@/services/users.service';
import * as jwt from 'jsonwebtoken';
import UserDto from '@/dto/user.dto';

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated?: boolean;
  user?: UserDto;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  authenticate: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();
  const authService = useAuthService();
  const usersService = useUsersService();
  const cookiesService = useCookiesService();

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserDto>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [cookies, _setCookies, removeCookies] = useCookies([
    'refresh_token',
    'access_token'
  ]);

  async function signIn(data: SignInData) {
    const { user, access_token, refresh_token } =
      await authService.signIn(data);

    cookiesService.storeJwtCookie('access_token', access_token);
    cookiesService.storeJwtCookie('refresh_token', refresh_token);

    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

    setUser(user);
    setIsAuthenticated(true);
  }

  const signOut = useCallback(() => {
    removeCookies('access_token');
    removeCookies('refresh_token');
    delete api.defaults.headers['Authorization'];
    setUser(undefined);
    setIsAuthenticated(false);
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeCookies, router]);

  const authenticate = useCallback(async () => {
    try {
      const refreshToken = cookies.refresh_token;

      if (!refreshToken) return setIsAuthenticated(false);

      const accessToken = cookies.access_token;
      if (!accessToken) {
        const { user, access_token, refresh_token } =
          await authService.refresh(refreshToken);

        cookiesService.storeJwtCookie('access_token', access_token);
        cookiesService.storeJwtCookie('refresh_token', refresh_token);

        api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

        setUser(user);
        setIsAuthenticated(true);
      } else {
        const { sub } = jwt.decode(accessToken) as jwt.JwtPayload;
        setUser(await usersService.findById(sub!));
      }
      setIsAuthenticated(true);
    } catch {
      signOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.access_token, cookies.refresh_token, signOut]);

  useEffect(() => {
    authenticate();
  }, [authenticate, pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
