import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormLabel,
  Input,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomizedTextField } from "../../GlobalStyle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns-tz";
import { useDispatch, useSelector } from "react-redux";
import {
  createOfferThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useParams } from "react-router-dom";
import axios from "axios";
const schema = yup.object({
  description: yup.string().required(),
  title: yup.string().required(),
  price: yup.string().required(),
  clinic: yup.string().required(),
  logo: yup.mixed().test((value) => {
    return value && value.length;
  }),
});

const OfferForm = () => {
  const [valueTo, setValueTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [ChangeValueTo, setChangeValueTo] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [Image, setImage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminData.isLoading);

  const onSubmit = async (data) => {
    const filteredData = covertToFormData(data);
    const res = await dispatch(
      createOfferThunk({
        url: `https://jihadm33.sg-host.com/public/api/dashboard/offer${
          params.id ? `/${params.id}` : ""
        }`,
        filteredData,
        params: params.id ? "put" : "",
      })
    );
    if (createOfferThunk.fulfilled.match(res)) {
      if (!params.id) {
        reset();
      }
    }
  };
  function covertToFormData(data) {
    const formData = new FormData();
    formData.append("clinic", data.clinic);
    formData.append("description", data.description);
    formData.append("image", data.logo[0]);
    formData.append("price", data.price);
    formData.append("title", data.title);
    formData.append("expier", valueTo);
    // Object.keys(data).forEach((item) => {
    //   if (data[item]) formData.append(item, data[item]);
    // });
    return formData;
  }
  // const token = localStorage.getItem("userToken");
  // const fetchData = async (data) => {
  //   const filteredData = covertToFormData(data);
  //   const response = await axios.post(
  //     "https://jihadm33.sg-host.com/public/api/dashboard/offer",
  //     filteredData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         // "X-HTTP-Method-Override": params,
  //       },
  //     }
  //   );
  // };
  const getUserData = async () => {
    if (params.id) {
      const response = await dispatch(
        getAdminDataThunk({
          url: `offer/${params.id}`,
        })
      );
      const data = response.payload.items;
      if (getAdminDataThunk.fulfilled.match(response)) {
        setValue("description", data[0].description);
        setValue("clinic", data[0].clinic);
        setValue("title", data[0].title);
        setValue("price", data[0].price);
        setValueTo(data[0].expier);
        setImage(data[0].image);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [params]);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Stack
      spacing={3}
      width={"30%"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack id="title">
        <FormLabel error={errors.title ? true : false}>
          {errors.title ? errors.title.message : "title"}
        </FormLabel>
        <CustomizedTextField
          type={"text"}
          placeholder={"title"}
          variant="outlined"
          {...register("title")}
        />
      </Stack>
      <Stack id="clinic">
        <FormLabel error={errors.clinic ? true : false}>
          {errors.clinic ? errors.clinic.message : "clinic"}
        </FormLabel>
        <CustomizedTextField
          type={"text"}
          placeholder={"clinic"}
          variant="outlined"
          {...register("clinic")}
        />
      </Stack>
      <Stack id="price">
        <FormLabel error={errors.price ? true : false}>
          {errors.price ? errors.price.message : "price"}
        </FormLabel>
        <CustomizedTextField
          type={"text"}
          placeholder={"price"}
          variant="outlined"
          {...register("price")}
        />
      </Stack>
      <Stack id="expiration-date">
        <FormLabel>expiration date</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            openTo="year"
            value={valueTo}
            onChange={(newValueTo) => {
              setChangeValueTo(newValueTo);
            }}
            onClose={() => {
              setValueTo(format(new Date(ChangeValueTo), "yyyy-MM-dd"));
            }}
            renderInput={(params) => (
              <CustomizedTextField
                label={"expiration date"}
                placeholder={"expiration date"}
                variant="outlined"
                required
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Stack>
      <Stack id="image">
        <FormLabel error={errors.image ? true : false}>
          {errors.image ? errors.image.message : "image"}
        </FormLabel>

        <input accept="image/*" type="file" {...register("logo")} />
        {Image && (
          <img
            style={{
              objectFit: "contain",
            }}
            width={"250px"}
            height={"250px"}
            src={Image}
            alt="#"
          />
        )}
      </Stack>
      <Stack id="description">
        <FormLabel error={errors.description ? true : false}>
          {errors.description ? errors.description.message : "description"}
        </FormLabel>
        <CustomizedTextField
          id="outlined-textarea"
          placeholder="Add notes here"
          multiline
          maxRows={5}
          fullWidth
          {...register("description")}
        />
      </Stack>
      <Stack id="Button">
        <Button type="submit">submit</Button>
      </Stack>
    </Stack>
  );
};

export default OfferForm;
