// types/next-auth.d.ts
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: "user" | "admin";
    } & DefaultSession["user"];
    Admin?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      contact: string;
    };
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    role?: "user" | "admin";
    Admin?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      contact: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    Admin?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      contact: string;
    };
    accessToken?: string;
  }
}