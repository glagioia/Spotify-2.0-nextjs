import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //Allow the request to continue if the following is true...
    //1) Its a reques for next auth session & provider teching
    //2) the token exist

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next()
    }

    //If the above is not true, then redirect to the login page
    if(!token && pathname !== "/login"){
        return NextResponse.redirect("/login")
    }
}
