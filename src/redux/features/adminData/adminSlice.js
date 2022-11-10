import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createOfferThunk, getAdminDataThunk } from "./adminActions";

const initialState = {
  adminData: {
    first: {},
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminDataThunk.pending, (state) => {});
    builder.addCase(getAdminDataThunk.fulfilled, (state, action) => {
      state.adminData = action.payload?.items;
    });
    builder.addCase(getAdminDataThunk.rejected, (state, action) => {});
    builder.addCase(createOfferThunk.fulfilled, (state, action) => {
      toast.success("offer added");
    });
    builder.addCase(createOfferThunk.rejected, (state, action) => {
      console.log(action.payload);
      // toast.success(action.payload);
    });
  },
});

export default adminSlice.reducer;
