import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, FormLabel, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createContactThunk,
  createPageThunk,
  getAdminDataThunk,
} from "../../redux/features/adminData/adminActions";
import { useParams } from "react-router-dom";
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

  return (
    <Stack
      spacing={3}
      width={"30%"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack id="type">
        <FormLabel error={errors.type ? true : false}>
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
        <FormLabel error={errors.value ? true : false}>
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
      <Stack id="Button">
        <Button type="submit">submit</Button>
      </Stack>
    </Stack>
  );
};

export default ContactForm;