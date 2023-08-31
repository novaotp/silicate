
import { NextRequest, NextResponse } from "next/server"
import JWT from "@shared/classes/JWT";
import route from "@/core/utils/route";


export default async function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    if (pathname === route.auth.use()) {
      return NextResponse.redirect(process.env.FRONTEND_URL + route.auth.login.use())
    }

    if (pathname === route.auth.logout.use()) {
      const res = NextResponse.redirect(process.env.FRONTEND_URL + route.use());

      res.cookies.delete('token');

      return res;
    }

    if (pathname === route.auth.login.use()) {

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

  // TODO: Add JWT cookie validation
  /* if (pathname.startsWith('/account')) {
      const jwt: string | undefined = request.cookies.get("tokenJWT")?.value;

      if (!jwt) {
          return NextResponse.redirect(process.env.FRONTEND_URL + '/auth/login')
      }

      try {
          await JWT.verify(jwt, process.env.JWT_SECRET!);
          return NextResponse.next();

      } catch (error) {
          return NextResponse.redirect(process.env.FRONTEND_URL + '/auth/login');

      }
  } */
}