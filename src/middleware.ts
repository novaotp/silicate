
// Next
import { type NextRequest, NextResponse } from "next/server";

// Internal
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

  if (pathname.startsWith('/app') && !await isAuthenticated(request)) {
    return NextResponse.redirect(new URL('/auth/log-out', request.url))
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get('id')?.value;

  if (!cookie) {
    return false;
  }

  const payload = await verify(cookie);

  return Object.values(payload).length !== 0;
}
