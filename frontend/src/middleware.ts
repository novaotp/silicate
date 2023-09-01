
import { NextRequest, NextResponse } from "next/server"
import { clientRoute } from "@shared/utils/route";


export default async function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    if (pathname === clientRoute.auth.use()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use())
    }

    if (pathname === clientRoute.auth.logout.use()) {
      const res = NextResponse.redirect(process.env.FRONTEND_URL + clientRoute.auth.login.use());

      res.cookies.delete('token');

      return res;
    }

    if (pathname === clientRoute.auth.login.use()) {

      await fetch(`${process.env.API_SERVER_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // TODO: make body
        })
      })

    }

  }
  
}