// src/app/(auth)/learner/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { learnerLoadSession } from "@/features/learnerAuthSlice";
import HomeNavbar from "@/components/Learner/LearnerNavbar";
import LearnerFooter from "@/components/Learner/LearnerFooter";

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.learnerAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(learnerLoadSession());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/learner");
    }
  }, [isAuthenticated, router]);

  

  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <LearnerFooter />
    </div>
  );
}