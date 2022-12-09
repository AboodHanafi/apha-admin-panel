import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Visibility } from "@mui/icons-material";
import CustomizedDialogs from "../../components/popUp";
import { CustomButton } from "../../GlobalStyle";

const MedicalFiles = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const medicalFiles = [
    {
      field: "index",
      headerName: "#",
    },
    {
      field: "name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "email",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "mobile",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "identity_number",
      headerName: "identity number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "paying_type",
      headerName: "paying type",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "insurance_number",
      headerName: "insurance number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: ({ row }) =>
        row.insurance_number === null ? "___" : row.insurance_number,
    },
    {
      field: "image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      renderCell: ({ row }) => (
        <IconButton key={row.id} onClick={() => handleView(row.image)}>
          <Visibility
            sx={{
              fill: "rgba(60, 192, 185, 1)",
            }}
          />
        </IconButton>
      ),
    },
  ];
  const handleView = (image) => {
    setImage(image);
    setOpen(true);
  };
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "dashboard/allFile",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
          medical files
        </Typography>
        <CustomButton
          CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"15%"}
          // onClick={() => navigate("/create-offer")}
        >
          open file
        </CustomButton>
        <CustomizedDialogs
          src={image}
          alt={image}
          open={open}
          setOpen={setOpen}
        />
      </Stack>
      <BasicTable columns={medicalFiles} rows={data} />
    </Stack>
  );
};

export default MedicalFiles;
