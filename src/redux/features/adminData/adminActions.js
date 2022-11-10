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

export const createOfferThunk = createAsyncThunk(
  "create/offer",
  async (
    { url, params, expier, clinic, price, title, description, image },
    thunkApi
  ) => {
    console.log(image);
    try {
      const { data } = await axios.post(
        url,
        {
          expier,
          clinic,
          price,
          title,
          description,
          image,
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
