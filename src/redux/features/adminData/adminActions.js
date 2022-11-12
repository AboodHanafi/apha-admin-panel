import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CRUDRequsests from "../../../apis";

const token = localStorage.getItem("userToken");
export const getAdminDataThunk = createAsyncThunk(
  "AdminData/user",
  async ({ url }, thunkApi) => {
    try {
      const { data } = await CRUDRequsests.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
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

function covertToFormData(data) {
  const formData = new FormData();
  formData.append("clinic", data.clinic);
  formData.append("description", data.description);
  formData.append("image", data.logo[0]);
  formData.append("price", data.price);
  formData.append("title", data.title);
  formData.append("expier", new Date());
  // Object.keys(data).forEach((item) => {
  //   if (data[item]) formData.append(item, data[item]);
  // });
  return formData;
}
export const createOfferThunk = createAsyncThunk(
  "create/offer",
  async ({ url, params, filteredData }, thunkApi) => {
    try {
      const { data } = await axios.post(
        url,
        filteredData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "X-HTTP-Method-Override": params,
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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
