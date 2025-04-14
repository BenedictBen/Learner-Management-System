import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  }

  interface Session {
    accessToken: string;
    user: User;
  }

  interface JWT {
    user?: User;
    accessToken?: string;
    sub?: string;
  }
}