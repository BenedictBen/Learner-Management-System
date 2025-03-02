import { Divider, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { Course } from "@/lib/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useMemo } from "react";
import SD from "../../../public/SD.png";
import CCE from "../../../public/CCE.png";
import DS from "../../../public/DS.png";

interface CourseCardrProps {
  courses: Course[];
  loading: boolean;
  error: string | null;
}
export default function CourseCard({
  courses,
  loading,
  error,
}: CourseCardrProps) {
  const { learners } = useSelector((state: RootState) => state.learner);

  // Memoize learner count calculation
  const learnerCountMap = useMemo(() => {
    const countMap: { [key: string]: number } = {};
    learners.forEach((learner) => {
      if (learner.course) {
        countMap[learner.course] = (countMap[learner.course] || 0) + 1;
      }
    }); 
    return countMap;
  }, [learners]);
  const fallbackImages = [SD, CCE, DS];
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <Spinner size="lg" color="#01589A" />
          </div>
        ) : (
          courses.map((item, index) => (
            <div
              key={index}
              className="border-8 border-casbGreyBorder rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={fallbackImages[index % fallbackImages.length]}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      fallbackImages[index % fallbackImages.length].src;
                  }}
                />
              </div>

              <div className="px-4 py-4 ">
                <h1 className="font-bold text-xl mb-4">{item.title}</h1>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Price:</span>
                      <span className="font-bold">${item.price}</span>
                    </div>
                    <Divider />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Duration:</span>
                      <span className="font-bold">{item.duration}</span>
                    </div>
                    <Divider />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Instructor:</span>
                      <span className="font-bold">{item.instructor}</span>
                    </div>
                    <Divider />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Learners:</span>
                      <span className="font-bold">
                        {learnerCountMap[item._id] || 0}
                      </span>
                    </div>
                    <Divider />
                  </div>

                  <Link
                    href={`/admin/dashboard/courses/${item._id}`}
                    // className="flex justify-between items-center bg-casbBluePrimary text-white p-3 rounded-md mt-4 hover:bg-blue-700 transition-colors"
                    className="flex text-white bg-casbBluePrimary items-center gap-3 p-2 flex-shrink-0 md:w-32 hover:bg-casbBlueHover"
                  >
                    <span>View more</span>
                    <Image
                      src="/chevron-right-white.png"
                      width={20}
                      height={20}
                      alt="chevron-right"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

        {!loading && courses.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500 text-xl">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
}
