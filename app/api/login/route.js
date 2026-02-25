import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Check if any users exist in the DB
        const allUsers = await db.select().from(users).limit(1).all();

        let authenticatedUser = null;

        if (allUsers.length === 0) {
            // Fallback for first initialization using env vars
            const serverPass = process.env.PASS;
            if (password === serverPass) {
                authenticatedUser = { email: 'admin@system', isAdmin: true };
            }
        } else {
            // Check DB for matching email and password
            const found = await db.select().from(users)
                .where(and(eq(users.email, email), eq(users.password, password)))
                .limit(1)
                .all();

            if (found.length > 0) {
                authenticatedUser = found[0];
            }
        }

        if (authenticatedUser) {
            const token = process.env.NEXT_PUBLIC_TOKEN;

            // Don't return password to frontend. Renaming to avoid conflict with 'password' from request.
            const { password: userPassword, ...userWithoutPassword } = authenticatedUser;

            const response = NextResponse.json({
                success: true,
                message: '/dashboard/',
                user: userWithoutPassword
            }, { status: 200 });

            response.cookies.set('bg-gray-800', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Email ou Senha incorretos' }, { status: 401 });
        }
    } catch (error) {
        console.error('ERRO NO LOGIN:', error);
        return NextResponse.json({ success: false, message: 'Erro interno no servidor: ' + error.message }, { status: 500 });
    }
}

export function GET() {
    return new NextResponse('Method Not Allowed', { status: 405 });
}
