
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateAdmin } from "@/lib/validateAdmin";
import type { DefaultSession } from "next-auth";
import { validateUser } from "@/lib/authValidate";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session  {
    user: {
      id?: string;
      role?: "admin" | "user";
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
    role?: "admin" | "user";
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

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user";
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      },
      // Add this authorize callback for Google
       profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user" // Automatically set role to 'user' for Google logins
        }
      }
    }),
    Credentials({
            id: "learner",
            name: "Learner",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) return null;
              
              try {
                const user = await validateUser(
                  credentials.email.toString(),
                  credentials.password.toString()
                );
                return { ...user, role: "user" };
              } catch {
                return null;
              }
            }
          }),
    // Credentials({
    //   id: "admin",
    //   name: "Admin",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) return null;

    //     try {
    //       const admin = await validateAdmin(
    //         credentials.email.toString(),
    //         credentials.password.toString()
    //       );

    //       // const token = await getAdminToken(admin.id); 

        
    //       return {
    //         id: admin.id,
    //         email: admin.email,
    //         name: `${admin.first_name} ${admin.last_name}`,
    //         role: "admin",
    //         // accessToken: token,
    //         Admin: {
    //           id: admin.id,
    //           first_name: admin.first_name,
    //           last_name: admin.last_name,
    //           email: admin.email,
    //           contact: admin.contact
    //         }
    //       };
    //     } catch (error) {
    //       return null;
    //     }
    //   }
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
 
  // pages: {
  //   signIn: "/admin/login",
  //   signOut: "/learner",
  //   error: "/login/error"
  // },
  // next-auth.config.ts
// cookies: {
//   sessionToken: {
//     name: "next-auth.session-token", // Different name from your backend token
//     options: {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 30 * 24 * 60 * 60 // Match your session maxAge
//     }
//   }
// },
 // Update your NextAuth config to ensure proper token handling
 callbacks: {
  async jwt({ token, user, trigger, session  }) {
    if (user) {
      token.accessToken = user.accessToken;
      token.role = user.role;
      token.id = user.id || ""; // Ensure id is always a string

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      if (user.role === "admin") {
        token.Admin = user.Admin;
      }
      
    }
    return token;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.Admin = token.Admin;
      session.user.id = token.sub || "";

      if (token.role === "admin") session.Admin = token.Admin;
      return session;
    
  },
  async signIn({ user, account }) {
    // Only allow Google sign-in for users (learners)
    if (account?.provider === "google") {
      if (user.role !== "user") {
        return "/unauthorized"; // Redirect if trying to use Google as admin
      }
      return true;
    }
    return true;
  }
},
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  debug: process.env.NODE_ENV === "development"
})