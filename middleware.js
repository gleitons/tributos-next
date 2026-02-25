import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('bg-gray-800');
        const expectedToken = process.env.NEXT_PUBLIC_TOKEN;

        if (!token || token.value !== expectedToken) {
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect /api/dados routes
    if (pathname.startsWith('/api/dados')) {
        const token = request.cookies.get('bg-gray-800');
        const expectedToken = process.env.NEXT_PUBLIC_TOKEN;

        if (!token || token.value !== expectedToken) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/dados/:path*'],
};
