import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'mivra-super-secret-key-2026-change-me');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static files and public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') || 
    pathname.startsWith('/tracking') ||
    pathname.startsWith('/solicitar-cotizacion') ||
    pathname.startsWith('/estado-cotizacion') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/hogar') ||
    pathname.startsWith('/para-tu-empresa') ||
    pathname.startsWith('/que-hacemos') ||
    pathname.startsWith('/conocenos') ||
    pathname.startsWith('/faq') ||
    pathname.startsWith('/trabaja-con-nosotros') ||
    pathname.startsWith('/terminos-y-condiciones') ||
    pathname.startsWith('/politica-de-privacidad') ||
    pathname.startsWith('/pqrsf') ||
    pathname.startsWith('/portal-cliente') ||
    pathname === '/login'
  ) {
    // If going to login but already authenticated, redirect to dashboard or conductores
    if (pathname === '/login') {
      const token = request.cookies.get('auth_token')?.value;
      if (token) {
        try {
          const verified = await jwtVerify(token, JWT_SECRET);
          const role = verified.payload.role;
          if (role === 'conductor') {
            return NextResponse.redirect(new URL('/conductores', request.url));
          }
          return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch (err) {
          // invalid token, let them log in
        }
      }
    }
    return NextResponse.next();
  }

  // Check auth
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    // Not authenticated -> Login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const role = verified.payload.role as string;

    // RBAC Rules
    if (role === 'conductor') {
      // Conductores can only access /conductores
      if (!pathname.startsWith('/conductores')) {
        return NextResponse.redirect(new URL('/conductores', request.url));
      }
    } else {
      // Other roles shouldn't access /conductores unless they need to, but let's say they can or can't.
      // Usually admins can access anything. Let's allow them everywhere for now.
    }

    return NextResponse.next();
  } catch (err) {
    // Token is invalid/expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
