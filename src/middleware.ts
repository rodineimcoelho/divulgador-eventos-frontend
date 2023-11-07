import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/update-account'];

export default function middleware(req: NextRequest) {
  if (
    protectedRoutes.includes(req.nextUrl.pathname) &&
    !cookies().has('refresh_token')
  )
    return NextResponse.redirect(new URL('/', req.url));
}
