import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  createContactThunk,
  createOfferThunk,
  createPageThunk,
  getAdminDataThunk,
} from "./adminActions";

const initialState = {
  adminData: {
    first: {},
  },
  loading: false,
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
    builder.addCase(createOfferThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOfferThunk.fulfilled, (state, action) => {
      toast.success("offer added");
      state.loading = false;
    });
    builder.addCase(createOfferThunk.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createPageThunk.fulfilled, (state, action) => {
      toast.success("page added");
    });
    builder.addCase(createPageThunk.rejected, (state, action) => {});
    builder.addCase(createContactThunk.fulfilled, (state, action) => {
      toast.success("contact added");
    });
    builder.addCase(createContactThunk.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default adminSlice.reducer;
