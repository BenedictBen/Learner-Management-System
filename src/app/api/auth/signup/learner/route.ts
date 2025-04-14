import { cookies } from 'next/headers';

function extractToken(cookieHeader: string) {
  const cookieParts = cookieHeader.split(';'); // Split by semicolon
  const tokenPart = cookieParts[0];              // Take the first part
  return tokenPart.split('=')[1];                // Get the value after "="
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    console.log('reqBody', reqBody);

    const signupUrl = 'https://tmp-se-project.azurewebsites.net/api/user/auth/signup';

    const res = await fetch(signupUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', res);

    const data = await res.json();
    console.log('Data:', data);

    const user = data.user;
    if (user) {
      const cookieHeader = res.headers.get('set-cookie');
      if (cookieHeader) {
        const token = extractToken(cookieHeader);
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
          expires,
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        });
        console.log('token', token);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "User created successfully",
          user: {
            email: user.email,
            verificationToken: user.verificationToken,
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: "User creation failed" 
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in signup POST:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: `Server error: ${error.message}` 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
