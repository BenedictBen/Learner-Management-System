


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define User interface with role
// interface User {
//   email: string;
//   id: string;
//   name?: string; // Added for Google display name
//   image?: string; // Added for Google profile picture
//   role?: "user" | "admin"; // Add role property
//   contact?: string;
// }

// interface AuthState {
//   user: null | User;
//   isAuthenticated: boolean;
//   pendingUserEmail: string | null;
//   verificationToken: string | null;
//   temporaryPassword: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   pendingUserEmail: null,
//   verificationToken: null,
//   temporaryPassword: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signin(state, action: PayloadAction<{ 
//       email: string; 
//       id: string;
//       name?: string;
//       image?: string;
//       role?: "user" | "admin"; // Include role in payload
//       contact?: string;
//     }>) {
//       state.user = {
//         email: action.payload.email,
//         id: action.payload.id,
//         name: action.payload.name,
//         image: action.payload.image,
//         role: action.payload.role || "user", // Default to 'user' if role is not provided
//       };
//       state.isAuthenticated = true;

//       // Store in localStorage if it's traditional login
//       if (!action.payload.name && !action.payload.image) {
//         localStorage.setItem("userEmail", action.payload.email);
//         localStorage.setItem("userId", action.payload.id);
//         if (action.payload.role) {
//           localStorage.setItem("userRole", action.payload.role); // Store role in localStorage
//         }
//       }
//     },
//     setVerificationToken(state, action: PayloadAction<string>) {
//       state.verificationToken = action.payload;
//       localStorage.setItem("verificationToken", action.payload);
//     },
//     logout(state) {
//       state.user = null;
//       state.isAuthenticated = false;

//       // Clear both auth methods' storage
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("verificationToken");
//       localStorage.removeItem("userRole"); // Clear role from localStorage
//     },
//     setPendingEmail: {
//       reducer(state, action: PayloadAction<string>) {
//         state.pendingUserEmail = action.payload;
//         localStorage.setItem("pendingEmail", action.payload);
//       },
//       prepare(email: string) {
//         return { payload: email };
//       },
//     },
//     setTemporaryPassword(state, action: PayloadAction<string>) {
//       state.temporaryPassword = action.payload;
//       localStorage.setItem("temporaryPassword", action.payload);
//     },
//     clearTemporaryPassword(state) {
//       state.temporaryPassword = "";
//     },
//   },
// });

// export const {
//   signin,
//   logout,
//   setPendingEmail,
//   setVerificationToken,
//   setTemporaryPassword,
//   clearTemporaryPassword,
// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BaseUser = {
  role: "admin" | "user";
  email: string;
  id: string;
  name?: string;
  image?: string;
};

export interface AdminUser extends BaseUser {
  role: "admin";
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  contact: string;
}

export interface LearnerUser extends BaseUser {
  role: "user";
}

export type User = AdminUser | LearnerUser;

interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
  loading: boolean;
  pendingUserEmail: string | null;
  verificationToken: string | null;
  temporaryPassword: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true, 
  pendingUserEmail: null,
  verificationToken: null,
  temporaryPassword: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadSession(state) {
      try {
        const storedAdmin = localStorage.getItem("adminUser");
        console.log("Stored adminUser:", storedAdmin);
        if (storedAdmin) {
          const parsedAdmin = JSON.parse(storedAdmin);
          // Validate stored admin structure
          if (parsedAdmin.role === "admin" && parsedAdmin.email && parsedAdmin.id) {
            state.user = parsedAdmin;
            state.isAuthenticated = true;
          } else {
            localStorage.removeItem("adminUser");
          }
        }
      } catch (error) {
        console.error("Session loading error:", error);
        localStorage.removeItem("adminUser");
      }
      state.loading = false;
    },
    signin(state, action: PayloadAction<User>) {
      const payload = action.payload;
      
      if (payload.role === "admin") {
        const adminUser: AdminUser = {
          email: payload.email,
          id: payload.id,
          role: "admin", // Explicit role assignment
          first_name: payload.first_name,
          last_name: payload.last_name,
          contact: payload.contact,
          name: `${payload.first_name} ${payload.last_name}`,
        };
        state.user = adminUser;
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
      } else {
        state.user = {
          email: payload.email,
          id: payload.id,
          role: "user",
          name: payload.name,
          image: payload.image,
        };
        localStorage.removeItem("adminUser");
      }

      state.isAuthenticated = true;

      // Store essential auth data in localStorage
      localStorage.setItem("userEmail", payload.email);
      localStorage.setItem("userId", payload.id);
      localStorage.setItem("userRole", payload.role);

      // Store admin-specific data if applicable
      if (payload.role === "admin") {
        localStorage.setItem("adminFirstName", payload.first_name);
        localStorage.setItem("adminLastName", payload.last_name);
        localStorage.setItem("adminContact", payload.contact);
        localStorage.setItem("adminEmail", payload.email);
        localStorage.setItem("adminId", payload.id);
      }
    },
    setVerificationToken(state, action: PayloadAction<string>) {
      state.verificationToken = action.payload;
      localStorage.setItem("verificationToken", action.payload);
    },
    logout(state) {
      localStorage.removeItem("adminUser");
      state.user = null;
      state.isAuthenticated = false;

      // Clear all auth-related storage
      [
        "userEmail", "userId", "verificationToken", "userRole",
        "adminFirstName", "adminLastName", "adminContact"
      ].forEach(key => localStorage.removeItem(key));
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
  
  signin,
  logout,
  loadSession,
  setPendingEmail,
  setVerificationToken,
  setTemporaryPassword,
  clearTemporaryPassword,
} = authSlice.actions;

export default authSlice.reducer;