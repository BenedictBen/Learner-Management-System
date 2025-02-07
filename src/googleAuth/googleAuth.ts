// googleAuth/googleAuth.ts
import NextAuth from 'next-auth';
import Google  from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { validateUser } from '@/lib/authValidate';
import { JWT } from 'next-auth/jwt'; 

console.log("NextAuth API route loaded");

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

// Update your existing NextAuth type extensions
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
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
          scope: 'openid email profile'
        }
      }
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Missing credentials");
          }

          
          
          const user = await validateUser(
            credentials.email.toString(),
            credentials.password.toString()
          );

          if (!user) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            name: user.name || "",
            email: user.email,
            image: user.image || null
          };
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/learner',
    signOut: '/learner',
    error: '/learner?error=AuthenticationFailed'
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;

      
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || "";
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name || null,
          email: token.email || null,
          image: token.image || null
        }
      }
    },
    authorized({ auth, request }) {
      const isLearnerRoute = request.nextUrl.pathname.startsWith('/learner')
      return isLearnerRoute ? !!auth : true
    },
    redirect({ url, baseUrl }) {
      const dashboardPath = `${baseUrl}/learner/dashboard`;
      const allowedPaths = [dashboardPath, `${baseUrl}/api/auth`];
      if (url.startsWith(baseUrl) && !allowedPaths.some(path => url.startsWith(path))) {
        return url;
      }
      return dashboardPath;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
    updateAge: 24 * 60 * 60 
  },
   debug: process.env.NODE_ENV === 'development'
})