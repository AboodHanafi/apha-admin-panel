import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormLabel, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPageThunk,
  getAdminDataThunk,
  medicalFormThunk,
} from "../../redux/features/adminData/adminActions";
import { useNavigate, useParams } from "react-router-dom";
const schema = yup.object({
  Fname_ar: yup.string().required(),
  Pname_ar: yup.string().required(),
  Gname_ar: yup.string().required(),
  Lname_ar: yup.string().required(),
  Fname_en: yup.string().required(),
  Pname_en: yup.string().required(),
  Gname_en: yup.string().required(),
  Lname_en: yup.string().required(),
  identity_number: yup.string().required(),
  mobile: yup.string().required(),
  email: yup.string(),
  insurance_no: yup.string().required(),
  pay_date: yup.string(),
  insurance_end_date: yup.string().required(),
  DOB: yup.string().required(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

const MedicalForm = () => {
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
  const params = useParams();
  // const data = useSelector((state) => state.adminData.adminData);
  const getUserData = async () => {
    const response = await dispatch(
      medicalFormThunk({
        url: `https://jihadm33.sg-host.com/public/api/dashboard/FileDetails/${params.id}`,
      })
    );
    const data = response.payload.items;
    if (medicalFormThunk.fulfilled.match(response)) {
      setValue("Fname_ar", data[0].Fname_ar);
      setValue("Pname_ar", data[0].Pname_ar);
      setValue("Gname_ar", data[0].Gname_ar);
      setValue("Lname_ar", data[0].Lname_ar);
      setValue("Fname_en", data[0].Fname_en);
      setValue("Pname_en", data[0].Pname_en);
      setValue("Gname_en", data[0].Gname_en);
      setValue("Lname_en", data[0].Lname_en);
      setValue("identity_number", data[0].identity_number);
      setValue("mobile", data[0].mobile);
      setValue("email", data[0].email);
      setValue("insurance_no", data[0].insurance_no);
      setValue("insurance_end_date", data[0].insurance_end_date);
      setValue("pay_date", data[0].pay_date);
      setValue("DOB", data[0].DOB);
      setValue("created_at", data[0].created_at);
      setValue("updated_at", data[0].updated_at);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Stack
      sx={{
        padding: 2,
      }}
      alignItems={"center"}
      spacing={2}
      component={"form"}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            first name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"first name"}
            variant="outlined"
            {...register("Fname_ar")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            parent name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"parent name"}
            variant="outlined"
            {...register("Pname_ar")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            grandfather name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"grandfather name"}
            variant="outlined"
            {...register("Gname_ar")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            last name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"last name"}
            variant="outlined"
            {...register("Lname_ar")}
          />
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            first name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"first name"}
            variant="outlined"
            {...register("Fname_en")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            parent name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"parent name"}
            variant="outlined"
            {...register("Pname_en")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            grandfather name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"grandfather name"}
            variant="outlined"
            {...register("Gname_en")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            last name
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"last name"}
            variant="outlined"
            {...register("Lname_en")}
          />
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            identity number
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"identity number"}
            variant="outlined"
            {...register("identity_number")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            mobile
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"mobile"}
            variant="outlined"
            {...register("mobile")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            email
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"email"}
            variant="outlined"
            {...register("email")}
          />
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            insurance number
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"insurance number"}
            variant="outlined"
            {...register("insurance_no")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            pay date
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"pay date"}
            variant="outlined"
            disabled={true}
            {...register("pay_date")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            date of birth
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"date of birth"}
            variant="outlined"
            {...register("DOB")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="price">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            insurance end date
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"insurance end date"}
            variant="outlined"
            {...register("insurance_end_date")}
          />
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Stack spacing={1} width={"20%"} minWidth="250px" id="title">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            requet date
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"requet date"}
            variant="outlined"
            {...register("created_at")}
          />
        </Stack>
        <Stack spacing={1} width={"20%"} minWidth="250px" id="clinic">
          <FormLabel
            sx={{
              color: "#0A0A0A",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            updated_at
          </FormLabel>
          <CustomizedTextField
            type={"text"}
            placeholder={"updated_at"}
            variant="outlined"
            {...register("updated_at")}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MedicalForm;
