
import { NextRequest, NextResponse } from "next/server"


export default async function Middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/auth') {
        return NextResponse.redirect(process.env.FRONTEND_URL + '/auth/login')
    }

    if (request.nextUrl.pathname === '/auth/logout') {
        const res = NextResponse.redirect(process.env.FRONTEND_URL + '/');

        res.cookies.delete('token');
        
        return res;
    }

    if (request.nextUrl.pathname === '/auth/login') {
        
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