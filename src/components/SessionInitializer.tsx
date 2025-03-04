// components/SessionInitializer.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSession } from "@/features/authSlice";
import { learnerLoadSession } from "@/features/learnerAuthSlice";

interface SessionInitializerProps {
  children: React.ReactNode;
}

export const SessionInitializer = ({ children }: SessionInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(learnerLoadSession());
  }, [dispatch]);

  return <>{children}</>;
};