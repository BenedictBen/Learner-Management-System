// "use client";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { signin } from "@/features/authSlice";
// import { useSession } from "next-auth/react";

// // Add type safety for session user
// type SessionUser = {
//   name?: string | null
//   email?: string | null
//   image?: string | null
//   role?: "admin" | "user";
// }

// export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useDispatch();
//   const { data: session, status  } = useSession();

//   useEffect(() => {
//     const initializeAuth = () => {
//       if (status === 'loading') return;
//       if (session?.user) {
//         const user = session.user as SessionUser;
        
//         dispatch(signin({
//           email: user.email || '', // Fallback to empty string
//           id: user.email || '',    // Using email as ID
//           name: user.name || undefined,
//           image: user.image || undefined,
          
//         }));
//       } else {
//         const email = localStorage.getItem('userEmail');
//         const id = localStorage.getItem('userId');
//         if (email && id) {
//           dispatch(signin({ 
//             email,
//             id,
//             name: undefined,
//             image: undefined
//           }));
//         }
//       }
//     };

//     initializeAuth();
//   }, [dispatch, session]);

//   return <>{children}</>;
// };

"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "@/features/authSlice";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      const { user } = session;

      dispatch(signin({
        email: user.email || "",
        id: user.id || "",
        name: user.name || undefined,
        image: user.image || undefined,
        role: "user"
      }));
    }
  }, [dispatch, session, status]);

  return <>{children}</>;
};