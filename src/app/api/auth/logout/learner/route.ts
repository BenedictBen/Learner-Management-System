// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear cookie
    response.cookies.set({
      name: 'token',
      value: '',
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    // Call backend logout
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/logout`, {
      method: 'POST'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}