// components/SessionInitializer.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSession } from "@/features/authSlice";

interface SessionInitializerProps {
  children: React.ReactNode;
}

export const SessionInitializer = ({ children }: SessionInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  return <>{children}</>;
};