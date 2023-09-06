
import { NextRequest, NextResponse } from "next/server"
import { clientRoute, serverRoute } from "@shared/classes/route";
import { TokenResponseProps, VerifyTokenProps } from "@shared/interfaces";


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

      const tokenResponse = await verifyTokenController({ jwt: userID.value })

      if (tokenResponse.success) {
        return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.use());
      }
    }
  }

  if (pathname.startsWith(clientRoute.app.use())) {
    const userID = request.cookies.get('id');

    if (!userID) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    const tokenResponse = await verifyTokenController({ jwt: userID.value })

    if (!tokenResponse.success) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    if (pathname === clientRoute.app.use()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.app.dashboard.use())
    }
  }
}

export async function verifyTokenController(data: VerifyTokenProps): Promise<TokenResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: TokenResponseProps = await response.json();

  return result;
}