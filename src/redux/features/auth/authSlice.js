import { createSlice } from "@reduxjs/toolkit";
import { signInThunk } from "./authActions";

let Authed_Storage_Key = "authed";
const initialState = {
  isAuthed: localStorage.getItem(Authed_Storage_Key) ? true : false,
  userToken: "",
  errorMsg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isAuthed = true;
      localStorage.setItem("userToken", action.payload?.token);
      localStorage.setItem(Authed_Storage_Key, "1");
    });
  },
});

export default authSlice.reducer;
