import * as jwt from 'jsonwebtoken';
import { Cookies } from 'react-cookie';

export function useCookiesService() {
  function storeJwtCookie(key: string, token: string) {
    const { exp } = jwt.decode(token) as jwt.JwtPayload;
    new Cookies().set(key, token, {
      expires: new Date(exp! * 1000)
    });
  }

  return { storeJwtCookie };
}
