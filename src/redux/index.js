import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/adminData/adminSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    adminData: adminSlice,
  },
});
