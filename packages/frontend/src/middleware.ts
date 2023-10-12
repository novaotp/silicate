
// Next
import { NextRequest, NextResponse } from "next/server"

// Internal
import { clientRoute } from "@shared/classes/routes";
import { UseVerifyTokenReturnProps, useVerifyTokenWithJWT } from "./core/hooks/useVerifyToken";
import { key, value, maxAge } from "@hooks/useTheme/config";

/** Returns a custom middleware for the app. */
const middleware = async (request: NextRequest) => {
  const { isAuthenticated } = useAuth(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(clientRoute.auth.use())) {
    if (pathname === clientRoute.auth.use()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    if (pathname === clientRoute.auth.logout.use()) {
      const res = NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use());

      res.cookies.delete('token');

      return res;
    }

    if (pathname === clientRoute.auth.login.use()) {
      if (await isAuthenticated()) {
        return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.use());
      }
    }
  }

  if (pathname.startsWith(clientRoute.app.use()) || pathname.startsWith(clientRoute.account.use())) {
    if (!await isAuthenticated()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    let res: NextResponse<unknown>;
    switch (pathname) {
      case clientRoute.app.use():
        res = NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.dashboard.use());
        break;

      case clientRoute.account.use():
        res = NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.account.profile.use());
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

/** A hook that returns a function that checks the state of authentication of the user. */
const useAuth = (request: NextRequest): UseAuthReturnProps => {
  /** Checks if the user is authenticated. Returns true or false appropriately. */
  const isAuthenticated = async (): Promise<boolean> => {
    const userID = request.cookies.get('id');

    if (!userID) {
      return false;
    }

    const { success }: UseVerifyTokenReturnProps = await useVerifyTokenWithJWT(userID.value);

    return success;
  }

  return {
    isAuthenticated
  }
}

export default middleware;
