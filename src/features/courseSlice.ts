
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CourseDetails {
//   program: string;
//   dateRegistered: string;
//   status: string;
//   amountPaid: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   gender: string;
//   location: string;
//   phone: string;
//   image: string;
// }

// interface CourseState {
//   hasCreatedCourse: boolean;
//   courseDetails: CourseDetails | null;
// }


// const getInitialCourseState = (): CourseState => {
//   if (typeof window === "undefined") return { hasCreatedCourse: false, courseDetails: null };
//   try {
//     const userId = localStorage.getItem("userId"); // Assume userId is stored during login
//     const storedState = localStorage.getItem(`courseState_${userId}`);
//     return storedState ? JSON.parse(storedState) : { hasCreatedCourse: false, courseDetails: null };
//   } catch (error) {
//     console.error("LocalStorage access error:", error);
//     return { hasCreatedCourse: false, courseDetails: null };
//   }
// };


// const initialState: CourseState = getInitialCourseState();

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setCourseCreated: (state, action: PayloadAction<boolean>) => {
//       state.hasCreatedCourse = action.payload;
      
//       try {
//         if (typeof window !== "undefined") {
//           localStorage.setItem(
//             "courseState",
//             JSON.stringify({ ...state, hasCreatedCourse: action.payload })
//           );
//           console.log("Payload received in setCourseDetails:", action.payload);
//         }
//       } catch (error) {
//         console.error("LocalStorage set error:", error);
//       }
//     },
//     setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
//       state.courseDetails = action.payload;
//       state.hasCreatedCourse = true;
//       try {
//         if (typeof window !== "undefined") {
//           const userId = localStorage.getItem("userId");
//           localStorage.setItem(
//             `courseState_${userId}`,
//             JSON.stringify({
//               hasCreatedCourse: true,
//               courseDetails: action.payload
//             })
//           );
//         }
//       } catch (error) {
//         console.error("LocalStorage set error:", error);
//       }
//     },
//     clearCourseState: (state) => {
//       state.hasCreatedCourse = false;
//       state.courseDetails = null;

//       try {
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("courseState");
//         }
//       } catch (error) {
//         console.error("LocalStorage clear error:", error);
//       }
//     },
//   },
// });

// export const { setCourseCreated,setCourseDetails, clearCourseState } = courseSlice.actions;
// export default courseSlice.reducer;



// features/course/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseDetails {
  program: string;
  dateRegistered: string;
  status: string;
  amountPaid: number;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  location: string;
  phone: string;
  image: string;
}

interface CourseState {
  hasCreatedCourse: boolean;
  courseDetails: CourseDetails | null;
}

const getInitialCourseState = (): CourseState => {
  if (typeof window === "undefined") return { hasCreatedCourse: false, courseDetails: null };
  try {
    const userId = localStorage.getItem("userId");
    const storedState = userId ? localStorage.getItem(`courseState_${userId}`) : null;
    return storedState ? JSON.parse(storedState) : { hasCreatedCourse: false, courseDetails: null };
  } catch (error) {
    console.error("LocalStorage access error:", error);
    return { hasCreatedCourse: false, courseDetails: null };
  }
};

const initialState: CourseState = getInitialCourseState();

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseCreated: (state, action: PayloadAction<boolean>) => {
      state.hasCreatedCourse = action.payload;
      try {
        if (typeof window !== "undefined") {
          const userId = localStorage.getItem("userId");
          if (userId) {
            localStorage.setItem(
              `courseState_${userId}`,
              JSON.stringify(state)
            );
          }
        }
      } catch (error) {
        console.error("LocalStorage set error:", error);
      }
    },
    setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
      state.courseDetails = action.payload;
      state.hasCreatedCourse = true;
      try {
        if (typeof window !== "undefined") {
          const userId = localStorage.getItem("userId");
          if (userId) {
            localStorage.setItem(
              `courseState_${userId}`,
              JSON.stringify(state)
            );
          }
        }
      } catch (error) {
        console.error("LocalStorage set error:", error);
      }
    },
    clearCourseState: (state) => {
      state.hasCreatedCourse = false;
      state.courseDetails = null;
      try {
        if (typeof window !== "undefined") {
          const userId = localStorage.getItem("userId");
          if (userId) {
            localStorage.removeItem(`courseState_${userId}`);
          }
        }
      } catch (error) {
        console.error("LocalStorage clear error:", error);
      }
    },
  },
});

export const { setCourseCreated, setCourseDetails, clearCourseState } = courseSlice.actions;
export default courseSlice.reducer;