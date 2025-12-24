/*import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('auth');

  if (!auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}*/

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    !token
  ) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  return NextResponse.next()
}