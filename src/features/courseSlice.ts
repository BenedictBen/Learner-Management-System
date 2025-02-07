


// features/course/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseDetails {
  program: string;
  dateRegistered: string;
  status: string;
  amountPaid: number;
}

interface CourseState {
  hasCreatedCourse: boolean;
  courseDetails: CourseDetails | null;
}

// Explicit return type and safer initialization
// const getInitialCourseState = (): boolean => {
//   if (typeof window === 'undefined') return false;
//   try {
//     return localStorage.getItem("hasCreatedCourse") === "true";
//   } catch (error) {
//     console.error("LocalStorage access error:", error);
//     return false;
//   }
// };

const getInitialCourseState = (): CourseState => {
  if (typeof window === "undefined") return { hasCreatedCourse: false, courseDetails: null };
  try {
    const storedState = localStorage.getItem("courseState");
    return storedState ? JSON.parse(storedState) : { hasCreatedCourse: false, courseDetails: null };
  } catch (error) {
    console.error("LocalStorage access error:", error);
    return { hasCreatedCourse: false, courseDetails: null };
  }
};
const initialState: CourseState = getInitialCourseState();
// const initialState: CourseState = {
//   hasCreatedCourse: getInitialCourseState(),
// };

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setCourseCreated: (state, action: PayloadAction<boolean>) => {
//       state.hasCreatedCourse = action.payload;
//       try {
//         if (typeof window !== 'undefined') {
//           localStorage.setItem("hasCreatedCourse", action.payload.toString());
//         }
//       } catch (error) {
//         console.error("LocalStorage set error:", error);
//       }
//     },
//   },
// });

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseCreated: (state, action: PayloadAction<boolean>) => {
      state.hasCreatedCourse = action.payload;
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "courseState",
            JSON.stringify({ ...state, hasCreatedCourse: action.payload })
          );
        }
      } catch (error) {
        console.error("LocalStorage set error:", error);
      }
    },
    setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
      state.courseDetails = action.payload;
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "courseState",
            JSON.stringify({ ...state, courseDetails: action.payload })
          );
        }
      } catch (error) {
        console.error("LocalStorage set error:", error);
      }
    },
  },
});

export const { setCourseCreated,setCourseDetails } = courseSlice.actions;
export default courseSlice.reducer;