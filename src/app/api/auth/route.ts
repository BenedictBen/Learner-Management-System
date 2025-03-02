// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax', // Changed from 'strict' to 'lax'
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
  });
  return response;
}