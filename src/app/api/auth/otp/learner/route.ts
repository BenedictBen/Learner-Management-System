

// app/api/auth/otp/route.ts
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get OTP from request
    const { token: otp } = await request.json();
    
    // Get verification token from cookies
    const cookieStore = await cookies();
    const verificationToken = cookieStore.get('token')?.value;

    if (!verificationToken) {
      return new Response(
        JSON.stringify({ success: false, message: "Verification session expired" }),
        { status: 401 }
      );
    }

    // Call external verification endpoint
    const verifyRes = await fetch('https://tmp-se-project.azurewebsites.net/api/user/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `verificationToken=${verificationToken}`
      },
      body: JSON.stringify({ token: otp }),
    });

    // Pass through the external API response
    const data = await verifyRes.json();
    
    return new Response(JSON.stringify(data), {
      status: verifyRes.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("OTP Verification Error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "Internal server error" 
      }),
      { status: 500 }
    );
  }
}


