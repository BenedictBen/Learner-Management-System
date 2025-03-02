import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

// Updated fetchLearnerCourses without filters and with flexible response checking.
export const fetchLearnerCourses = createAsyncThunk(
  "learnerCourses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const url = new URL("/api/auth/courses", window.location.origin);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();
      let courses;
      if (Array.isArray(data)) {
        courses = data;
      } else if (data && data.courses) {
        courses = data.courses;
      } else {
        throw new Error("Invalid response structure");
      }

      return courses.map((course: any) => ({
        _id: course._id,
        adminId: course.adminId,
        title: course.title,
        price: course.price,
        instructor: course.instructor,
        duration: course.duration,
        stacks: course.stacks,
        image: course.image,
        descriptions: course.descriptions,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      }));
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const getInitialCourseState = (): CourseState => {
  if (typeof window === "undefined")
    return { hasCreatedCourse: false, courseDetails: null };
  try {
    const userId = localStorage.getItem("userId");
    const storedState = userId ? localStorage.getItem(`courseState_${userId}`) : null;
    return storedState
      ? JSON.parse(storedState)
      : { hasCreatedCourse: false, courseDetails: null };
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
            localStorage.setItem(`courseState_${userId}`, JSON.stringify(state));
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
            localStorage.setItem(`courseState_${userId}`, JSON.stringify(state));
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
