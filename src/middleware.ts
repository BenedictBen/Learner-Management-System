

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Match EXACT role values from your JWT
interface CustomJwtPayload {
  role?: 'Admin' | 'Learner'; // Capitalized to match your backend
  [key: string]: any;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Validate token and role with CASE-SENSITIVE checks
  const validateAccess = (requiredRole: 'Admin' | 'Learner') => {
    if (!token) return false;
    console.log("Token in middleware:", token);
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      return decoded.role === requiredRole;
    } catch (error) {
      return false;
    }
  };

  // Admin routes protection
  if (pathname.startsWith("/admin/dashboard")) {
    if (!validateAccess('Admin')) { // Capital 'A'
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Learner routes protection
  if (pathname.startsWith("/learner/dashboard")) {
    if (!validateAccess('Learner')) { // Capital 'L'
      const loginUrl = new URL("/learner", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/learner/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};