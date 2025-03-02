

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "@/lib/types";

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

// Existing thunk for fetching courses...
export const fetchCourses = createAsyncThunk(
  "adminCourses/fetchCourses",
  async (filters: { course?: string; search?: string } = {}, { rejectWithValue }) => {
    try {
      const { course, search } = filters;
      const url = new URL("/api/auth/courses", window.location.origin);

      if (course) url.searchParams.append("course", course);
      if (search) url.searchParams.append("search", search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();

      if (!data.courses) throw new Error("Invalid response structure");

      return data.courses.map((course: any) => ({
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

// Existing update thunk...
export const updateCourseAsync = createAsyncThunk(
  "adminCourses/updateCourse",
  async (updatedCourse: Course, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/auth/courses/${updatedCourse._id}/update`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });
      if (!response.ok) throw new Error("Update failed");
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// NEW: Create Course Thunk
export const createCourseAsync = createAsyncThunk(
  "adminCourses/createCourse",
  async (newCourse: Partial<Course>, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (!response.ok) throw new Error("Failed to create course");
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const courseSlice = createSlice({
  name: "adminCourses",
  initialState,
  reducers: {
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (l) => l._id === action.payload._id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch courses";
      })
      // Update Course
      .addCase(updateCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (l) => l._id === action.payload._id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Update failed";
      })
      // Create Course
      .addCase(createCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Append the newly created course to the state
        state.courses.push(action.payload);
      })
      .addCase(createCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to create course";
      });
  },
});

export const { updateCourse } = courseSlice.actions;
export default courseSlice.reducer;
