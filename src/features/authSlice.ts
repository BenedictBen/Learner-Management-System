import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  id: string;
  name?: string;  // Added for Google display name
  image?: string; // Added for Google profile picture
}

interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
  pendingUserEmail: string | null;
  verificationToken: string | null;
  temporaryPassword: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  pendingUserEmail: null,
  verificationToken: null,
  temporaryPassword: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, action: PayloadAction<{ 
      email: string; 
      id: string;
      name?: string;
      image?: string;
    }>) {
      state.user = {
        email: action.payload.email,
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image
      };
      state.isAuthenticated = true;
      
      // Store in localStorage if it's traditional login
      if (!action.payload.name && !action.payload.image) {
        localStorage.setItem('userEmail', action.payload.email);
        localStorage.setItem('userId', action.payload.id);
      }
    },
    setVerificationToken(state, action: PayloadAction<string>) {
      state.verificationToken = action.payload;
      localStorage.setItem('verificationToken', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Clear both auth methods' storage
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('verificationToken');
    },
    setPendingEmail: {
      reducer(state, action: PayloadAction<string>) {
        state.pendingUserEmail = action.payload;
        localStorage.setItem('pendingEmail', action.payload);
      },
      prepare(email: string) {
        return { payload: email };
      }
    },
    setTemporaryPassword: (state, action: PayloadAction<string>) =>{
      state.temporaryPassword = action.payload;
      localStorage.setItem('temporaryPassword', action.payload);
    },
    clearTemporaryPassword: (state) => { // Optional: Cleanup
      state.temporaryPassword = '';
    },
  },
});

export const { signin, logout, setPendingEmail, setVerificationToken, setTemporaryPassword, clearTemporaryPassword } = authSlice.actions;
export default authSlice.reducer;