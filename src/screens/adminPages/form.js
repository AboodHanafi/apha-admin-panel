import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormLabel, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createPageThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const schema = yup.object({
  description: yup.string().required(),
  title: yup.string().required(),
});

const PagesForm = () => {
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

  const onSubmit = async (data) => {
    const res = await dispatch(
      createPageThunk({
        url: `https://jihadm33.sg-host.com/public/api/dashboard/page${
          params.id ? `/${params.id}` : ""
        }`,
        title: data.title,
        description: data.description,
        params: params.id ? "put" : "",
      })
    );
    if (createPageThunk.fulfilled.match(res)) {
      if (!params.id) {
        reset();
        toast.success("page added");
      } else {
        toast.success("page edited");
        navigate("/pages");
      }
    }
  };
  const getUserData = async () => {
    if (params.id) {
      const response = await dispatch(
        getAdminDataThunk({
          url: `dashboard/page/${params.id}`,
        })
      );
      const data = response.payload.items;
      if (getAdminDataThunk.fulfilled.match(response)) {
        setValue("description", data[0].description);
        setValue("title", data[0].name);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [params]);

  return (
    <Stack
      spacing={3}
      width={"100%"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={1} id="title">
        <FormLabel
          sx={{
            color: "#0A0A0A",
            fontSize: "16px",
            fontWeight: 600,
          }}
          error={errors.title ? true : false}
        >
          {errors.title ? errors.title.message : "Page Title"}
        </FormLabel>
        <CustomizedTextField
          type={"text"}
          placeholder={"title"}
          variant="outlined"
          {...register("title")}
        />
      </Stack>

      <Stack spacing={1} id="description">
        <FormLabel
          sx={{
            color: "#0A0A0A",
            fontSize: "16px",
            fontWeight: 600,
          }}
          error={errors.description ? true : false}
        >
          {errors.description ? errors.description.message : "Content"}
        </FormLabel>
        <CustomizedTextField
          id="outlined-textarea"
          placeholder="Add notes here"
          multiline
          minRows={17}
          fullWidth
          {...register("description")}
        />
      </Stack>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-end"
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
          onClick={() => navigate("/pages")}
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

export default PagesForm;
