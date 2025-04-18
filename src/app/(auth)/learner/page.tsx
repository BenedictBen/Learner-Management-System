// src/app/(auth)/learner/page.tsx
import LearnerHero from "@/components/Learner/LearnerHero";
import LearnerNextStep from "@/components/Learner/LearnerNextStep";
import LearnerSolutions from "@/components/Learner/LearnerSolutions";
import Register from "@/components/Learner/RegisterCourse";


export default function LearnerPage() {
  return (
    <>
      <LearnerHero />
      <LearnerSolutions />
      <LearnerNextStep />
      <Register />
    </>
  );
}