
// Next
import { NextRequest, NextResponse } from "next/server"

// Internal
import { clientRoute } from "@shared/classes/route";
import { UseVerifyTokenReturnProps, useVerifyTokenWithJWT } from "./core/controllers/verifyToken";

export default async function Middleware(request: NextRequest) {
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
      const userID = request.cookies.get('id');

      if (!userID) {
        return NextResponse.next();
      }

      const { success }: UseVerifyTokenReturnProps = await useVerifyTokenWithJWT(userID.value);

      if (success) {
        return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.use());
      }
    }
  }

  if (pathname.startsWith(clientRoute.app.use())) {
    const userID = request.cookies.get('id');

    if (!userID) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    const { success }: UseVerifyTokenReturnProps = await useVerifyTokenWithJWT(userID.value);

    if (!success) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    if (pathname === clientRoute.app.use()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.dashboard.use())
    }
  }
}
