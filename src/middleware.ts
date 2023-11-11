
// Next
import { NextRequest, NextResponse } from "next/server";

// Internal
import { key, value, maxAge } from "@libs/hooks/useTheme/config";
import { verify } from "@utils/jwt";

/** Returns a custom middleware for the app. */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!(pathname.startsWith("/app") || pathname.startsWith("/auth"))) {
    return NextResponse.next();
  }
  
  if (pathname === '/auth/log-in' && await isAuthenticated(request)) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  if (pathname.startsWith('/app')) {
    if (!await isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/auth/log-in', request.url))
    }

    const res = NextResponse.next(); 

    if (!request.cookies.has('theme')) {
      res.cookies.set(key, value, { maxAge: maxAge });
    }

    return res;
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get('id')?.value;

  if (!cookie) {
    return false;
  }

  const payload = await verify(cookie);

  return (payload.payload as any).userID !== undefined;
}
