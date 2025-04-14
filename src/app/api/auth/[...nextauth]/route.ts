// // src/app/api/auth/[...nextauth]/route.ts

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { NextAuthOptions, User, Account, Profile, Session, TokenSet } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
  }

  interface User {
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
  }
}

export const authOptions = {
  providers: [
    // your credentials provider...

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          });
  
          const data = await res.json();
  
          if (res.ok && data.token) {
            (user as any).backendToken = data.token; // Add it to user object temporarily
          } else {
            console.error("Backend token not returned");
            return false;
          }
        } catch (err) {
          console.error("Google sign-in failed:", err);
          return false;
        }
      }
      return true;
    },
  
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      session.backendToken = token.backendToken as string | undefined;
      return session;
    },
  
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
    }) {
      if (user && (user as any).backendToken) {
        token.backendToken = (user as any).backendToken;
      }
      return token;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

