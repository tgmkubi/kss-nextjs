import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/about',
    '/profile',
    '/settings'
  ];
  
  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/home',
    '/contact',
    '/public'
  ];
  
  // Check for authentication tokens in cookies
  const hasAuthTokens = checkAuthTokens(request);

  // If user is on auth pages (login, signup, etc.)
  if (pathname.startsWith('/auth/')) {
    if (hasAuthTokens) {
      // User is authenticated, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // User is not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  // If it's a protected route and user is not authenticated
  if (isProtectedRoute && !hasAuthTokens) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If it's a public route, allow access regardless of auth status
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For any other routes, require authentication by default
  if (!hasAuthTokens) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

function checkAuthTokens(request: NextRequest): boolean {
  try {
    const cookies = request.cookies;
    const allCookies = cookies.getAll();

    // Debug: Log all cookies to see what's actually there
    console.log('All cookies:', allCookies.map(c => ({ name: c.name, hasValue: !!c.value })));

    // Check for Cognito authentication cookies
    const cognitoUserPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
    const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID;

    console.log('Cognito config:', { cognitoUserPoolId, cognitoClientId });

    // Look for any Cognito-related cookies
    for (const cookie of allCookies) {
      // Check for standard Cognito cookie patterns
      if (cookie.name.includes('CognitoIdentityServiceProvider')) {
        console.log('Found Cognito cookie:', cookie.name);
        if ((cookie.name.includes('accessToken') ||
          cookie.name.includes('idToken') ||
          cookie.name.includes('LastAuthUser')) &&
          cookie.value) {
          console.log('Valid auth cookie found:', cookie.name);
          return true;
        }
      }

      // Check for Amplify cookies
      if (cookie.name.includes('amplify') && cookie.value) {
        console.log('Found Amplify cookie:', cookie.name);
        return true;
      }
    }

    // Fallback: check for common auth cookie names
    const authCookieNames = [
      'amplify-signin',
      'aws-amplify-token',
      'auth-token',
      'access-token',
      'id-token'
    ];

    for (const cookieName of authCookieNames) {
      const cookie = cookies.get(cookieName);
      if (cookie?.value) {
        console.log('Found fallback auth cookie:', cookieName);
        return true;
      }
    }

    console.log('No auth cookies found');
    return false;
  } catch (error) {
    console.error('Cookie check error:', error);
    return false;
  }
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api (API routes)
     * - _next/static (static assets)
     * - _next/image (image optimization)
     * - favicon.ico
     * Now includes auth pages for redirect logic
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

