import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormLabel, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createPageThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useParams } from "react-router-dom";
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
      console.log(response);
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

export default PagesForm;
