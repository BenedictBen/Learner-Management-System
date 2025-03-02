import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { auth  } from "@/googleAuth/googleAuth";

export async function middleware(req: NextRequest){
    const { pathname } = req.nextUrl;
    
    if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get('token');
    // Allow auth check API
     

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Learner routes protection (using Next-Auth - preserved original code)
  if (pathname.startsWith("/learner/dashboard")) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
    if (!session) {
      return NextResponse.redirect(new URL("/learner/login", req.url));
    }
  
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learner/dashboard/:path*", 
  '/admin/dashboard/:path*',
 
  ],
};
