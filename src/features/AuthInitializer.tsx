// AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "@/features/authSlice";

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = () => {
      const email = localStorage.getItem('userEmail');
      const id = localStorage.getItem('userId');
      
      if (email && id) {
        dispatch(signin({ email, id }));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
};