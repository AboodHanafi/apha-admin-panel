import { createAsyncThunk } from "@reduxjs/toolkit";
import CRUDRequsests from "../../../apis";

export const signInThunk = createAsyncThunk(
  "signin/user",
  async ({ email, password }, thunkApi) => {
    try {
      const { data } = await CRUDRequsests.post("/admin-login", {
        email,
        password,
      });
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        msg: "incorrect email or password",
      });
    }
  }
);
