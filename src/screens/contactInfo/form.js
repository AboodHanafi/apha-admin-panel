import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormLabel,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContactThunk,
  createPageThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const schema = yup.object({
  type: yup.string().required(),
  value: yup.string().required(),
});

const ContactForm = () => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.adminData.isLoading);

  const onSubmit = async (data) => {
    const res = await dispatch(
      createContactThunk({
        url: `https://jihadm33.sg-host.com/public/api/dashboard/contact${
          params.id ? `/${params.id}` : ""
        }`,
        type: data.type,
        value: data.value,
        params: params.id ? "put" : "",
      })
    );
    if (createContactThunk.fulfilled.match(res)) {
      if (!params.id) {
        reset();
        toast.success("contact added");
      } else {
        navigate("/contactinfo");
        toast.success("contact edited");
      }
    }
  };
  const getUserData = async () => {
    if (params.id) {
      const response = await dispatch(
        getAdminDataThunk({
          url: `dashboard/contact/${params.id}`,
        })
      );
      const data = response.payload.items;
      if (getAdminDataThunk.fulfilled.match(response)) {
        setValue("type", data[0].type);
        setValue("value", data[0].value);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [params]);

  const contactType = ["FB", "TW", "IG", "TK", "SC", "WA", "YT", "E", "PH"];
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Stack
      spacing={3}
      width={"40%"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel
        sx={{
          color: "rgba(10, 10, 10, 1)",
          fontWeight: 600,
          fontSize: "16px",
        }}
      >
        {params.id ? "Edit Contact " : "Add Contact"}
      </FormLabel>
      <Stack id="type">
        <FormLabel
          sx={{
            color: "rgba(10, 10, 10, 1)",
            fontWeight: 500,
            fontSize: "16px",
          }}
          error={errors.type ? true : false}
        >
          {errors.type ? errors.type.message : "type"}
        </FormLabel>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={contactType}
          renderInput={(params) => (
            <CustomizedTextField
              placeholder="Select Type"
              {...params}
              {...register("type")}
            />
          )}
        />
      </Stack>

      <Stack id="value">
        <FormLabel
          sx={{
            color: "rgba(10, 10, 10, 1)",
            fontWeight: 500,
            fontSize: "16px",
          }}
          error={errors.value ? true : false}
        >
          {errors.value ? errors.value.message : "value"}
        </FormLabel>
        <CustomizedTextField
          id="outlined-textarea"
          placeholder="Add notes here"
          multiline
          maxRows={5}
          fullWidth
          {...register("value")}
        />
      </Stack>

      <Stack spacing={2} direction={"row"} width={"100%"} id="Button">
        <CustomButton
          border={"1px solid #0E4C8F"}
          textcolor="#0E4C8F"
          variant="contained"
          width={"49%"}
          sx={{
            bgcolor: "#fff",
          }}
          onClick={() => navigate("/contactinfo")}
        >
          back
        </CustomButton>
        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          width={"49%"}
          sx={{
            bgcolor: "#0E4C8F",
          }}
          type="submit"
        >
          submit
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default ContactForm;
