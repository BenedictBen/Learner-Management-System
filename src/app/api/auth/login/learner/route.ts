// import { cookies } from 'next/headers'

// function extractToken(cookieHeader: string) {
//   const cookieParts = cookieHeader.split(';') // Split the cookie by semicolons
//   const tokenPart = cookieParts[0] // The token is the first part before the first semicolon
//   const token = tokenPart.split('=')[1] // Get the part after the '='
//   return token
// }

// export async function POST(request: Request) {
//   try {
//     const reqBody = await request.json()

//     console.log('reqBody', reqBody)

//     const login =
//       'https://tmp-se-project.azurewebsites.net//api/user/auth/sigin'

//     try {
//       const res = await fetch(login, {
//         method: 'POST',
//         body: JSON.stringify(reqBody),
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })

//       console.log(res)

//       const data = await res.json()

//       if (data) {
//         // Accessing all headers
//         const headers = res.headers
//         console.log('Response Headers:', headers)

//         // Getting a specific header (e.g., 'set-cookie' header)
//         const cookieHeader = headers.get('set-cookie')

//         if (cookieHeader) {
//           const token = extractToken(cookieHeader)

//           const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30d

//           const cookieStore = await cookies()

//           cookieStore.set('token', token, {
//             expires,
//             httpOnly: true,
//             secure: true,
//             sameSite: 'lax',
//           })

//           console.log('learnerToken', token)

//           return new Response(JSON.stringify({
//             success: true,
//             message: "Login successful",
//             user: {
//               _id: data.user._id,
//               email: data.user.email,
//             }
//           }), {
//             status: 200,
//             headers: {'Content-Type': 'application/json'}
//           });
//         }
//       }

//       //   console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   } catch (error) {
//     return new Response('Server error: ${(error as Error).message}', {
//       status: 400,
//     })
//   }

//   return new Response('Success!', {
//     status: 200,
//   })
// }

// api/auth/login/learner/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    
    // Fixed API URL (removed double slash)
    const externalApiUrl = 'https://tmp-se-project.azurewebsites.net/api/user/auth/signin';
    
    const externalResponse = await fetch(externalApiUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle non-JSON responses
    const contentType = externalResponse.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid response format from external API');
    }

    const data = await externalResponse.json();

    if (!externalResponse.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Login failed' },
        { status: externalResponse.status }
      );
    }

    // Get the token from external API response headers
    const cookieHeader = externalResponse.headers.get('set-cookie');
    if (!cookieHeader) {
      throw new Error('Authentication token missing in response');
    }

    // Extract token from cookie header
    const token = cookieHeader.split(';')[0].split('=')[1];

    // Set cookie in the response with the name "token"
    const response = NextResponse.json({
      success: true,
      user: {
        _id: data.user._id,
        email: data.user.email,
      },
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
