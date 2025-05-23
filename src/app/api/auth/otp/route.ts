

// app/api/auth/otp/route.ts
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { token: otp } = await request.json();

    // Get token stored in cookies
    const cookieStore = await cookies(); // no await needed
    const verificationToken = cookieStore.get('token')?.value;

    if (!verificationToken) {
      return new Response(
        JSON.stringify({ success: false, message: 'Verification session expired' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call your external API
    const verifyRes = await fetch('https://tmp-se-project.azurewebsites.net/api/admin/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${verificationToken}`, // Assuming the external API expects Bearer token
      },
      body: JSON.stringify({ token: otp }),
    });

    const data = await verifyRes.json();

    return new Response(JSON.stringify(data), {
      status: verifyRes.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("OTP Verification Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
