import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Learner-specific types
interface LearnerUser {
  role: "learner";
  email: string;
  id: string;
  name?: string;
  image?: string;
}

interface LearnerAuthState {
  user: null | LearnerUser;
  isAuthenticated: boolean;
  loading: boolean;
  pendingUserEmail: string | null;
  verificationToken: string | null;
  temporaryPassword: string | null;
}

const initialState: LearnerAuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  pendingUserEmail: null,
  verificationToken: null,
  temporaryPassword: null,
};

const learnerAuthSlice = createSlice({
  name: "learnerAuth",
  initialState,
  reducers: {
    learnerLoadSession(state) {
      try {
        const storedUser = localStorage.getItem("learnerUser");
        console.log("Stored storedUser:", storedUser);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.role === "learner" && parsedUser.email && parsedUser.id) {
            state.user = parsedUser;
            state.isAuthenticated = true;
          } else {
            localStorage.removeItem("learnerUser");
          }
        }
      } catch (error) {
        console.error("Learner session loading error:", error);
        localStorage.removeItem("learnerUser");
      }
      state.loading = false;
    },

    signin(state, action: PayloadAction<{ email: string; id: string }>) {
      const learnerUser: LearnerUser = {
        role: "learner",
        email: action.payload.email,
        id: action.payload.id
      };
      
      state.user = learnerUser;
      state.isAuthenticated = true;

      // Store learner-specific data
      localStorage.setItem("learnerUser", JSON.stringify(learnerUser));
      localStorage.setItem("learnerEmail", action.payload.email);
      localStorage.setItem("learnerId", action.payload.id);
    },

    // features/learnerAuthSlice.ts
learnerLogout(state) {
  state.user = null;
  state.isAuthenticated = false;
  ["learnerUser", "learnerEmail", "learnerId"].forEach(key => {
    localStorage.removeItem(key);
  });
},

    setVerificationToken(state, action: PayloadAction<string>) {
      state.verificationToken = action.payload;
      localStorage.setItem("verificationToken", action.payload);
    },

    setPendingEmail(state, action: PayloadAction<string>) {
      state.pendingUserEmail = action.payload;
      localStorage.setItem("pendingEmail", action.payload);
    },

    setTemporaryPassword(state, action: PayloadAction<string>) {
      state.temporaryPassword = action.payload;
      localStorage.setItem("temporaryPassword", action.payload);
    },

    clearTemporaryPassword(state) {
      state.temporaryPassword = null;
      localStorage.removeItem("temporaryPassword");
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  learnerLoadSession,
  signin,
  learnerLogout,
  setPendingEmail,
  setVerificationToken,
  setTemporaryPassword,
  clearTemporaryPassword,
  setLoading
} = learnerAuthSlice.actions;

export default learnerAuthSlice.reducer;