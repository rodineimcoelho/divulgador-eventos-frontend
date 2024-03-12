import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = [
  '/update-account',
  'manage-events',
  'manage-lecturers'
];
const notAuthenticadedRoutes = ['/signup', '/signin'];

export default function middleware(req: NextRequest) {
  const isAuthenticated = cookies().has('refresh_token');

  if (
    (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) ||
    (isAuthenticated && notAuthenticadedRoutes.includes(req.nextUrl.pathname))
  )
    return NextResponse.redirect(new URL('/', req.url));
}
