import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    let path = request.nextUrl.pathname;
    let isPublicPath = path === '/login' || path === '/signUp';
    let cookie = request.cookies.get('token')?.value || '';
    if (isPublicPath && cookie)
        return NextResponse.redirect(new URL('/', request.url));
    if (!isPublicPath && !cookie)
        return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signUp',
        '/profile/:path*'
    ],
}