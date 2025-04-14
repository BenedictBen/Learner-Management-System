
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const reqBody = await request.json();
    
//     // Fixed API URL (removed double slash)
//     const externalApiUrl = 'https://tmp-se-project.azurewebsites.net/api/user/auth/signin';
    
//     const externalResponse = await fetch(externalApiUrl, {
//       method: 'POST',
//       body: JSON.stringify(reqBody),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Handle non-JSON responses
//     const contentType = externalResponse.headers.get('content-type');
//     if (!contentType?.includes('application/json')) {
//       throw new Error('Invalid response format from external API');
//     }

//     const data = await externalResponse.json();

//     if (!externalResponse.ok) {
//       return NextResponse.json(
//         { success: false, error: data.message || 'Login failed' },
//         { status: externalResponse.status }
//       );
//     }

//     // Get the token from external API response headers
//     const cookieHeader = externalResponse.headers.get('set-cookie');
//     if (!cookieHeader) {
//       throw new Error('Authentication token missing in response');
//     }

//     // Extract token from cookie header
//     const token = cookieHeader.split(';')[0].split('=')[1];

//     // Set cookie in the response with the name "token"
//     const response = NextResponse.json({
//       success: true,
//       user: {
//         _id: data.user._id,
//         email: data.user.email,
//       },
//     });

//     response.cookies.set({
//       name: 'token',
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//       path: '/',
//     });

//     return response;

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: error instanceof Error ? error.message : 'Invalid email and password'
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const reqBody = await request.json();
//     console.log('Request body:', reqBody);

//     // Correct URL (verified no double slashes)
//     const externalApiUrl = 'https://tmp-se-project.azurewebsites.net/api/admin/auth/login';
    
//     let externalResponse;
//     try {
//       externalResponse = await fetch(externalApiUrl, {
//         method: 'POST',
//         body: JSON.stringify(reqBody),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (fetchError) {
//       console.error('Fetch error:', fetchError);
//       throw new Error('Failed to connect to authentication service');
//     }

//     // First read the response as text
//     const responseText = await externalResponse.text();
//     console.log('Raw response:', responseText);

//     let responseData;
//     try {
//       responseData = JSON.parse(responseText);
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       responseData = { message: responseText };
//     }

//     // Create the response object first
//     const nextResponse = NextResponse.json({
//       success: externalResponse.ok,
//       error: externalResponse.ok ? undefined : (responseData.message || 'Authentication failed'),
//       user: externalResponse.ok ? {
//         _id: responseData.user?._id,
//         email: responseData.user?.email
//       } : undefined
//     });

//     // Only set cookie for successful responses
//     if (externalResponse.ok) {
//       const cookieHeader = externalResponse.headers.get('set-cookie');
//       if (!cookieHeader) {
//         throw new Error('Authentication token missing in response');
//       }

//       const token = cookieHeader.split(';')[0].split('=')[1];
//       nextResponse.cookies.set({
//         name: 'token',
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/',
//       });
//     }

//     // Return with the original status code
//     return new NextResponse(nextResponse.body, {
//       status: externalResponse.status,
//       headers: nextResponse.headers
//     });

//   } catch (error) {
//     console.error('Login processing error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: error instanceof Error ? error.message : 'Authentication failed'
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server'; 
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const externalApiUrl = 'https://tmp-se-project.azurewebsites.net/api/admin/auth/login';

    const externalResponse = await fetch(externalApiUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const text = await externalResponse.text();
    console.log("External API raw response:", text);
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (e) {
      // If external API response is not JSON (e.g., "Success!")
      return NextResponse.json(
        { success: false, message: text || "Unexpected response from external service" },
        { status: externalResponse.status }
      );
    }

    const response = NextResponse.json(responseData, {
      status: externalResponse.status
    });

    if (externalResponse.ok) {
      const cookieHeader = externalResponse.headers.get('set-cookie');
      if (cookieHeader) {
        response.cookies.set({
          name: 'token',
          value: cookieHeader.split(';')[0].split('=')[1],
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      }
    }

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
