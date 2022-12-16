import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  createContactThunk,
  createOfferThunk,
  createPageThunk,
  getAdminDataThunk,
  medicalFormThunk,
  updateMedicalFile,
} from "./adminActions";

const initialState = {
  adminData: {
    first: {},
  },
  isLoading: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminDataThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAdminDataThunk.fulfilled, (state, action) => {
      state.adminData = action.payload?.items;
      state.isLoading = false;
    });
    builder.addCase(getAdminDataThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createOfferThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOfferThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createOfferThunk.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg.message);
    });
    builder.addCase(createPageThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPageThunk.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createPageThunk.rejected, (state, action) => {
      toast.error(action.payload.msg.message);
      state.isLoading = true;
    });
    builder.addCase(createContactThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createContactThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createContactThunk.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg.message);
    });
    builder.addCase(medicalFormThunk.fulfilled, (state, action) => {
      state.adminData = action.payload?.items;
    });
    builder.addCase(medicalFormThunk.rejected, (state, action) => {});
    builder.addCase(updateMedicalFile.fulfilled, (state, action) => {});
    builder.addCase(updateMedicalFile.rejected, (state, action) => {});
  },
});

export default adminSlice.reducer;
