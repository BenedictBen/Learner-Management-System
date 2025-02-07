export { auth as middleware } from "@/googleAuth/googleAuth";

export const config = {
  matcher: ["/learner/dashboard/:path*"]
};