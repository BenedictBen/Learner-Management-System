import { createSlice, PayloadAction } from"@reduxjs/toolkit";

interface AuthState {
  user: null | { email: string; id: string };
  isAuthenticated: boolean;
  pendingUserEmail: string | null;
  verificationToken: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    pendingUserEmail: null,
    verificationToken: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state, action: PayloadAction<{ email: string; id: string }>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            
          },
          setVerificationToken(state, action: PayloadAction<string>) {
            state.verificationToken = action.payload;
            localStorage.setItem('verificationToken', action.payload);
          },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
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
    },
});

export const { signin, logout, setPendingEmail, setVerificationToken } = authSlice.actions;
export default authSlice.reducer;
