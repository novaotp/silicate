
import { NextRequest, NextResponse } from "next/server"
import JWT from "./core/classes/JWT";


export default async function Middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/auth")) {
        if (pathname === '/auth') {
            return NextResponse.redirect(process.env.FRONTEND_URL + '/auth/login')
        }

        if (pathname === '/auth/logout') {
            const res = NextResponse.redirect(process.env.FRONTEND_URL + '/');

            res.cookies.delete('token');
            
            return res;
        }

        if (pathname === '/auth/login') {
            
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