import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://jihadm33.sg-host.com/public/api",
});

const CRUDRequsests = {
  get: async (url, config) => {
    return await baseApi.get(url, config);
  },
  post: async (url, config) => {
    return await baseApi.post(url, config);
  },
};

export default CRUDRequsests;
