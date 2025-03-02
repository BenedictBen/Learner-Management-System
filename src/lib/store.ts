import learnerReducer  from './../features/learnerSlice';
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import courseReducer from "../features/courseSlice";
import AdminCourseReducer  from "../features/CoursesSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        learner: learnerReducer,
        adminCourses: AdminCourseReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;