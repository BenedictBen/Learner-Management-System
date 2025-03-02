import { cookies } from 'next/headers'

function extractToken(cookieHeader: string) {
  const cookieParts = cookieHeader.split(';') // Split the cookie by semicolons
  const tokenPart = cookieParts[0] // The token is the first part before the first semicolon
  const token = tokenPart.split('=')[1] // Get the part after the '='
  return token
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json()

    console.log('reqBody', reqBody)

    const login =
      'https://tmp-se-project.azurewebsites.net//api/admin/auth/login'

    try {
      const res = await fetch(login, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(res)

      const data = await res.json()

      if (data) {
        // Accessing all headers
        const headers = res.headers
        console.log('Response Headers:', headers)

        // Getting a specific header (e.g., 'set-cookie' header)
        const cookieHeader = headers.get('set-cookie')

        if (cookieHeader) {
          const token = extractToken(cookieHeader)

          const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30d

          const cookieStore = await cookies()

          cookieStore.set('token', token, {
            expires,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
          })

          console.log('token', token)

          return new Response(JSON.stringify({
            success: true,
            message: "Login successful",
            Admin: {
              _id: data.Admin._id,
              email: data.Admin.email,
              first_name: data.Admin.first_name,
              last_name: data.Admin.last_name,
              contact: data.Admin.contact
            }
          }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
          });
        }
      }

      //   console.log(data)
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    return new Response('Server error: ${(error as Error).message}', {
      status: 400,
    })
  }

  return new Response('Success!', {
    status: 200,
  })
}