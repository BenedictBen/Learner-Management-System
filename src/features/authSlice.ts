import { createSlice, PayloadAction } from"@reduxjs/toolkit";

interface AuthState {
  user: null | { email: string; id: string };
  isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state, action: PayloadAction<{ email: string; id: string }>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            
          },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
        },
    },
});

export const { signin, logout } = authSlice.actions;
export default authSlice.reducer;
