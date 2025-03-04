// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


// interface Course {
//   _id: string;
//   title: string;
//   // ... other course properties
// }

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

// // Updated fetchLearnerCourses without filters and with flexible response checking.
// export const fetchLearnerCourses = createAsyncThunk(
//   "learnerCourses/fetchCourses",
//   async (_, { rejectWithValue }) => {
//     try {
//       const url = new URL("/api/auth/courses", window.location.origin);
//       const res = await fetch(url.toString());
//       if (!res.ok) throw new Error("Failed to fetch courses");

//       const data = await res.json();
//       let courses;
//       if (Array.isArray(data)) {
//         courses = data;
//       } else if (data && data.courses) {
//         courses = data.courses;
//       } else {
//         throw new Error("Invalid response structure");
//       }

//       return courses.map((course: any) => ({
//         _id: course._id,
//         adminId: course.adminId,
//         title: course.title,
//         price: course.price,
//         instructor: course.instructor,
//         duration: course.duration,
//         stacks: course.stacks,
//         image: course.image,
//         descriptions: course.descriptions,
//         createdAt: course.createdAt,
//         updatedAt: course.updatedAt,
//       }));
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const getInitialCourseState = (): CourseState => {
//   if (typeof window === "undefined")
//     return { hasCreatedCourse: false, courseDetails: null };
//   try {
//     const userId = localStorage.getItem("userId");
//     const storedState = userId ? localStorage.getItem(`courseState_${userId}`) : null;
//     return storedState
//       ? JSON.parse(storedState)
//       : { hasCreatedCourse: false, courseDetails: null };
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
//           const userId = localStorage.getItem("userId");
//           if (userId) {
//             localStorage.setItem(`courseState_${userId}`, JSON.stringify(state));
//           }
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
//           if (userId) {
//             localStorage.setItem(`courseState_${userId}`, JSON.stringify(state));
//           }
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
//           const userId = localStorage.getItem("userId");
//           if (userId) {
//             localStorage.removeItem(`courseState_${userId}`);
//           }
//         }
//       } catch (error) {
//         console.error("LocalStorage clear error:", error);
//       }
//     },
//   },
// });

// export const { setCourseCreated, setCourseDetails, clearCourseState } = courseSlice.actions;
// export default courseSlice.reducer;


// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// interface Course {
//   _id: string;
//   title: string;
//   // ... other course properties
// }

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
//   learnerCourses: Course[]; // Added learner-specific courses array
//   loading: boolean;
//   error: string | null;
// }

// // Updated fetchLearnerCourses with proper credentials and error handling
// export const fetchLearnerCourses = createAsyncThunk(
//   "learnerCourses/fetchCourses",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("[Learner] Starting course fetch...");
//       const res = await fetch("/api/auth/courses", {
//         credentials: 'include', // Crucial for cookies
//         headers: { "Content-Type": "application/json" }
//       });

//       console.log("[Learner] Fetch response status:", res.status);
      
//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("[Learner] Server error response:", errorData);
//         throw new Error(errorData.message || "Failed to fetch courses");
//       }

//       const data = await res.json();
//       console.log("[Learner] Raw API response:", data);

//       // Flexible response handling
//       let courses = Array.isArray(data) ? data : data.courses || [];
//       console.log("[Learner] Processed courses count:", courses.length);

//       return courses.map((course: any) => ({
//         _id: course._id,
//         title: course.title,
//         // Map other necessary fields for learner view
//         price: course.price,
//         instructor: course.instructor,
//         duration: course.duration,
//         image: course.image,
//         // Exclude admin-only fields
//       }));
//     } catch (err: any) {
//       console.error("[Learner] Fetch error:", err);
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // Enhanced initial state with safety checks
// const getInitialCourseState = (): CourseState => {
//   const baseState = {
//     hasCreatedCourse: false,
//     courseDetails: null,
//     learnerCourses: [],
//     loading: false,
//     error: null
//   };

//   if (typeof window === "undefined") return baseState;

//   try {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return baseState;

//     const storedState = localStorage.getItem(`courseState_${userId}`);
//     return storedState ? JSON.parse(storedState) : baseState;
//   } catch (error) {
//     console.error("LocalStorage initialization error:", error);
//     return baseState;
//   }
// };

// const initialState: CourseState = getInitialCourseState();

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setCourseCreated: (state, action: PayloadAction<boolean>) => {
//       state.hasCreatedCourse = action.payload;
//       safePersistState(state);
//     },
//     setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
//       state.courseDetails = action.payload;
//       state.hasCreatedCourse = true;
//       safePersistState(state);
//     },
//     clearCourseState: (state) => {
//       state.hasCreatedCourse = false;
//       state.courseDetails = null;
//       state.learnerCourses = [];
//       safeClearState();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLearnerCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         console.log("[Learner] Courses fetch pending...");
//       })
//       .addCase(fetchLearnerCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.learnerCourses = action.payload;
//         console.log("[Learner] Courses fetch successful:", action.payload.length);
//         safePersistState(state);
//       })
//       .addCase(fetchLearnerCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         console.error("[Learner] Courses fetch failed:", action.payload);
//         safePersistState(state);
//       });
//   },
// });

// // Safe state persistence utility
// const safePersistState = (state: CourseState) => {
//   if (typeof window === "undefined") return;

//   try {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       const { loading, error, ...persistableState } = state;
//       localStorage.setItem(`courseState_${userId}`, JSON.stringify(persistableState));
//     }
//   } catch (error) {
//     console.error("Safe persistence error:", error);
//   }
// };

// // Safe state clearing utility
// const safeClearState = () => {
//   if (typeof window === "undefined") return;

//   try {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       localStorage.removeItem(`courseState_${userId}`);
//     }
//   } catch (error) {
//     console.error("Safe clear error:", error);
//   }
// };

// export const { setCourseCreated, setCourseDetails, clearCourseState } = courseSlice.actions;
// export default courseSlice.reducer;


import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Course {
  _id: string;
  title: string;
  stacks: string[];
  price: number;
  instructor: string;
  duration: string;
  image: string;
}

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
  learnerCourses: Course[];
  loading: boolean;
  error: string | null;
}

export const fetchLearnerCourses = createAsyncThunk(
  "learnerCourses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/courses", {
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch courses");
      }

      const data = await res.json();
      return Array.isArray(data) ? data : data.courses || [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const getInitialCourseState = (): CourseState => ({
  hasCreatedCourse: false,
  courseDetails: null,
  learnerCourses: [],
  loading: false,
  error: null
});

const initialState: CourseState = getInitialCourseState();

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseCreated: (state, action: PayloadAction<boolean>) => {
      state.hasCreatedCourse = action.payload;
    },
    setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
      state.courseDetails = action.payload;
      state.hasCreatedCourse = true;
    },
    clearCourseState: (state) => {
      state.hasCreatedCourse = false;
      state.courseDetails = null;
      state.learnerCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnerCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLearnerCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.learnerCourses = action.payload;
      })
      .addCase(fetchLearnerCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCourseCreated, setCourseDetails, clearCourseState } = courseSlice.actions;
export default courseSlice.reducer;