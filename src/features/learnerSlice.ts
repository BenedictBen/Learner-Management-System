import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Learner  } from "@/lib/types";

interface LearnerState {
    learners: Learner[],
    loading: boolean;
    error: string | null;
}

const initialState: LearnerState ={
    learners: [],
    loading: false,
    error: null,
}


export const fetchLearners = createAsyncThunk(
  'learner/fetchLearners',
  async (filters: { course?: string; search?: string } = {}) => {
    const { course, search } = filters;
    const url = new URL('/api/auth/learners', window.location.origin);

    if (course && course !== "all") {
        url.searchParams.append('course', course);
      }

      // Only append search if it's not empty (after trimming).
      if (search && search.trim() !== "") {
        url.searchParams.append('search', search.trim());
      }


    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to fetch learners");
    const data = await res.json();
    console.log("API returned learners:", data);
    return data.map((learner: any) => ({
      _id: learner._id,
      firstname: learner.firstname,
      lastname: learner.lastname,
      email: learner.email,
      image: learner.image?.includes("example.com") ? "/john.png" : learner.image,
      course: learner.course,
      amount: learner.amount,
      createdAt: learner.createdAt,
      updatedAt: learner.updatedAt,
      gender: learner.gender,
      phone: learner.phone,
      location: learner.location,
      description: learner.description
    }));
  }
);

export const updateLearnerAsync = createAsyncThunk(
  'learner/updateLearner',
  async (updatedLearner: Learner, { rejectWithValue }) => {
      try {
          const response = await fetch(`/api/auth/learners/${updatedLearner._id}/update`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedLearner),
          });
          if (!response.ok) throw new Error('Update failed');
          return await response.json();
      } catch (err: any) {
          return rejectWithValue(err.message);
      }
  }
);

export const deleteLearnerAsync = createAsyncThunk(
  'learner/deleteLearner',
  async (learnerId: string, { rejectWithValue }) => {
      try {
          const response = await fetch(`/api/auth/learners/${learnerId}/delete`, {
              method: "DELETE",
          });
          if (!response.ok) throw new Error('Delete failed');
          return learnerId;
      } catch (err: any) {
          return rejectWithValue(err.message);
      }
  }
);


  export const learnerSlice = createSlice({
    name: 'learner',
    initialState,
    reducers: {
        updateLearner: (state, action) => {
            const index = state.learners.findIndex(
                l => l._id === action.payload._id
            );
            if (index !== -1) {
                state.learners[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Learners
            .addCase(fetchLearners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLearners.fulfilled, (state, action) => {
                state.loading = false;
                state.learners = action.payload;
            })
            .addCase(fetchLearners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch learners';
            })
            
            // Update Learner
            .addCase(updateLearnerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLearnerAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.learners.findIndex(
                    l => l._id === action.payload._id
                );
                if (index !== -1) {
                    state.learners[index] = action.payload;
                }
            })
            .addCase(updateLearnerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Update failed';
            })
            
            // Delete Learner
            .addCase(deleteLearnerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLearnerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.learners = state.learners.filter(
                    l => l._id !== action.payload
                );
            })
            .addCase(deleteLearnerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Delete failed';
            });
    },
});

  export const { updateLearner } = learnerSlice.actions;
  export default learnerSlice.reducer;