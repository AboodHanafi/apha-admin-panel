import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormLabel,
  Input,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns-tz";
import { useDispatch, useSelector } from "react-redux";
import {
  createOfferThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BrokenImageOutlined } from "@mui/icons-material";
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [Image, setImage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminData.isLoading);
  const navigate = useNavigate();
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
      } else {
        navigate("/offers");
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

    return formData;
  }

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
      sx={{
        padding: 2,
      }}
      alignItems={"center"}
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"49%"} id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
            error={errors.title ? true : false}
          >
            {errors.title ? errors.title.message : "title"}
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"title"}
            variant="outlined"
            {...register("title")}
          />
        </Stack>
        <Stack spacing={1} width={"49%"} id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
            error={errors.clinic ? true : false}
          >
            {errors.clinic ? errors.clinic.message : "clinic"}
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"clinic"}
            variant="outlined"
            {...register("clinic")}
          />
        </Stack>
        <Stack spacing={1} width={"49%"} id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
            error={errors.price ? true : false}
          >
            {errors.price ? errors.price.message : "price"}
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"price"}
            variant="outlined"
            {...register("price")}
          />
        </Stack>
        <Stack spacing={1} width={"49%"} id="expiration-date">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            expiration date
          </FormLabel>
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

        <Stack width={"100%"} id="description">
          <FormLabel error={errors.description ? true : false}>
            {errors.description ? errors.description.message : "description"}
          </FormLabel>
          <CustomizedTextField
            id="outlined-textarea"
            placeholder="Add notes here"
            multiline
            minRows={5}
            {...register("description")}
          />
        </Stack>

        <Stack
          width={"100%"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          {params.id ? (
            <>
              <Box
                component={"label"}
                justifyContent={"center"}
                alignItems="center"
                sx={{
                  display: "flex",
                  bgcolor: "#fff",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "1px dashed rgba(10, 10, 10, 0.2)",
                  borderRadius: "4px",
                  width: "49%",
                  height: "110px",
                }}
              >
                <BrokenImageOutlined
                  sx={{
                    fill: "rgba(10, 10, 10, 0.2)",
                  }}
                  fontSize="large"
                />
                <Typography fontSize={"12px"} fontWeight={500}>
                  Upload logo here
                </Typography>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  {...register("logo")}
                />
              </Box>
              <Stack width={"49%"}>
                <img
                  width={"300px"}
                  height="200px"
                  style={{
                    objectFit: "contain",
                  }}
                  src={Image}
                  alt=""
                />
              </Stack>
            </>
          ) : (
            <>
              <Box
                component={"label"}
                justifyContent={"center"}
                alignItems="center"
                sx={{
                  display: "flex",
                  bgcolor: "#fff",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "1px dashed rgba(10, 10, 10, 0.2)",
                  borderRadius: "4px",
                  width: "100%",
                  height: "110px",
                }}
              >
                <BrokenImageOutlined
                  sx={{
                    fill: "rgba(10, 10, 10, 0.2)",
                  }}
                  fontSize="large"
                />
                <Typography fontSize={"12px"} fontWeight={500}>
                  Upload logo here
                </Typography>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  {...register("logo")}
                />
              </Box>
            </>
          )}
        </Stack>
      </Stack>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-end"
        width={"100%"}
        id="Button"
      >
        <CustomButton
          border={"1px solid #0E4C8F"}
          textcolor="#0E4C8F"
          variant="contained"
          sx={{
            bgcolor: "#fff",
          }}
          width={"10%"}
          onClick={() => navigate("/offers")}
        >
          back
        </CustomButton>
        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"10%"}
          type="submit"
        >
          submit
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default OfferForm;
