"use client";
import HomeNavbar from "@/components/Learner/HomeNavbar";
import LearnerFooter from "@/components/Learner/LearnerFooter";
import LearnerHero from "@/components/Learner/LearnerHero";
import LearnerNextStep from "@/components/Learner/LearnerNextStep";
import LearnerSolutions from "@/components/Learner/LearnerSolutions";
import Register from "@/components/Learner/RegisterCourse";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import LoginModal from "@/components/Learner/LoginModal";

const LearnerPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/learner");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <HomeNavbar />
      <LearnerHero />
      <LearnerSolutions />
      <LearnerNextStep />
      <Register />
      <LearnerFooter />
      
      <LoginModal />
    </div>
    
  );
};

export default LearnerPage;