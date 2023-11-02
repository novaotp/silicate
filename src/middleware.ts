
// Next
import { NextRequest, NextResponse } from "next/server";

// Internal
import { key, value, maxAge } from "@hooks/useTheme/config";
import { verify } from "./utils/verifyToken";

/** Returns a custom middleware for the app. */
const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (pathname === '/auth') {
      return NextResponse.redirect('/auth/log-in')
    }

    if (pathname === '/auth/log-in') {
      if (await isAuthenticated(request)) {
        return NextResponse.redirect('/app');
      }
    }
  }

  if (pathname.startsWith('/app') || pathname.startsWith('/account')) {
    if (!await isAuthenticated(request)) {
      return NextResponse.redirect('/auth/log-in')
    }

    let res: NextResponse<unknown>;
    switch (pathname) {
      case '/app':
        res = NextResponse.redirect('/app/dashboard');
        break;

      case '/account':
        res = NextResponse.redirect('/account/profile');
        break;
    
      default:
        res = NextResponse.next();
        break;
    }      

    if (!request.cookies.has('theme')) {
      res.cookies.set(key, value, { maxAge: maxAge });
    }

    return res;
  }
}

interface UseAuthReturnProps {
  /** Checks if the user is authenticated. Returns true or false appropriately. */
  isAuthenticated(): Promise<boolean>;
}

const isAuthenticated = async (request: NextRequest): Promise<boolean> => {
  const cookie = request.cookies.get('id')?.value;

  if (!cookie) {
    return false;
  }

  const { message, data } = await verify(cookie);

  return message === "" && data !== undefined;
}

export default middleware;
