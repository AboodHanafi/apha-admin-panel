import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CRUDRequsests from "../../../apis";

// const token = localStorage.getItem("userToken");
export const getAdminDataThunk = createAsyncThunk(
  "AdminData/user",
  async ({ url }, thunkApi) => {
    try {
      const { data } = await CRUDRequsests.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        msg: e,
      });
    }
  }
);

export const createOfferThunk = createAsyncThunk(
  "create/offer",
  async ({ url, params, filteredData }, thunkApi) => {
    try {
      const { data } = await axios.post(url, filteredData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "X-HTTP-Method-Override": params,
        },
      });

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        msg: e.response.data,
      });
    }
  }
);

export const createPageThunk = createAsyncThunk(
  "create/page",
  async ({ url, params, title, description }, thunkApi) => {
    try {
      const { data } = await axios.post(
        url,
        {
          name: title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "X-HTTP-Method-Override": params,
          },
        }
      );

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        msg: e.response.data,
      });
    }
  }
);

export const createContactThunk = createAsyncThunk(
  "create/contact",
  async ({ url, params, type, value }, thunkApi) => {
    try {
      const { data } = await axios.post(
        url,
        {
          type,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "X-HTTP-Method-Override": params,
          },
        }
      );

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        msg: e.response.data,
      });
    }
  }
);
