

import { AppDispatch, RootState } from "@/lib/store";
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

// const getInitialCourseState = (): CourseState => ({
//   hasCreatedCourse: false,
//   courseDetails: null,
//   learnerCourses: [],
//   loading: false,
//   error: null
// });

// const initialState: CourseState = getInitialCourseState();


const initialState: CourseState = {
  hasCreatedCourse: false,
  courseDetails: null,
  learnerCourses: [],
  loading: false,
  error: null
};

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
      // state.learnerCourses = [];
    },
    // resetAllCourses: () => getInitialCourseState(),
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