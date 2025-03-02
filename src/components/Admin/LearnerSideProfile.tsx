import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Learner } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useCourseList } from "@/hooks/learner/useAuth";


interface LearnerSideProfileProps {
  learnerId: string | null; // Changed to use ID instead of full object
  onClose: () => void;
}

export default function LearnerSideProfile({
  learnerId,
  onClose,
}: LearnerSideProfileProps) {
  // Get the FRESH learner data directly from Redux store
  const learner = useSelector((state: RootState) => {
    return learnerId
      ? state.learner.learners.find((l) => l._id === learnerId)
      : null;
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourseList();

  const getCourseTitle = (courseId: string) => {
    if (!courses || coursesLoading) return "Loading...";
    const course = courses.find((course) => course._id === courseId);
    return course?.title || "";
  };

  return (
    <Sheet open={!!learnerId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full max-w-none p-0">
        {learner ? (
          <div className=" w-full">
            <div className="pt-20 px-10 bg-casbBluePrimary h-44">
              <div className="flex items-center flex-col justify-center  mb-4">
                <div className="relative w-36 h-36 rounded-full overflow-hidden">
                <Image
                  src={learner.image || "/john.png"}
                  alt="Profile"
                    fill
                className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/john.png";
                  }}
                />
                </div>
                <div className="text-black dark:text-white text-center">
                  <h2 className="text-xl font-bold">
                    {learner.firstname} {learner.lastname}
                  </h2>
                  <p className="text-sm font-bold">{learner.email}</p>
                </div>
              </div>
              <div className="grid gap-4 py-4 text-black dark:text-white">
                <div className="flex items-center justify-start gap-4">
                  <span className="opacity-70">Program</span>
                  <p className="font-medium">{getCourseTitle(learner.course)}</p>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className="opacity-70">Gender</span>
                  <p className="font-medium">{learner.gender}</p>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className="opacity-70">Contact</span>
                  <p className="font-medium">{learner.phone}</p>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className="opacity-70">Location</span>
                  <p className="font-medium">{learner.location}</p>
                </div>
                <div className="flex items-center justify-start gap-10">
                  <span className="opacity-70">Paid</span>
                  <p className="font-medium">${learner.amount}</p>
                </div>
                {/* <div className="flex items-center justify-start gap-4">
                             <span className="opacity-70">Bio</span>
                             <p className="font-medium">{learner.description}</p>
                         </div> */}
                <div className="grid grid-cols-[auto,1fr] items-start gap-8 md:gap-12 ">
                  <span className="opacity-70">Bio</span>
                  <p className="font-medium">{learner.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // <div className="p-4 text-center">Loading learner data...</div>
          <div className="p-4 text-center">
            {learnerId ? "Loading learner data..." : "No learner selected"}
          </div>
        )}
        
      </SheetContent>
    </Sheet>
  );
}
