'use client';
import { createContext, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';
import authService from '@/services/auth.service';
import cookiesService from '@/services/cookies.service';
import usersService from '@/services/users.service';
import * as jwt from 'jsonwebtoken';
import { User } from '@/types/User';

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated?: boolean;
  user?: User;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const router = useRouter();
  const cookieStore = new Cookies();

  async function signIn(data: SignInData) {
    const { user, access_token, refresh_token } =
      await authService.signIn(data);

    cookiesService.storeJwtCookie('access_token', access_token);
    cookiesService.storeJwtCookie('refresh_token', refresh_token);

    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

    setUser(user);
    setIsAuthenticated(true);
  }

  function signOut() {
    cookieStore.remove('access_token');
    cookieStore.remove('refresh_token');
    setUser(undefined);
    setIsAuthenticated(false);
    router.push('/');
  }

  useEffect(() => {
    async function authenticate() {
      const refreshToken = cookieStore.get('refresh_token');

      if (!refreshToken) return setIsAuthenticated(false);

      const accessToken = cookieStore.get('access_token');
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
        setIsAuthenticated(true);
      }
    }

    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
