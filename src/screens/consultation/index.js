import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";

const Consultation = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const consultations = [
    {
      field: "index",
      headerName: "#",
      maxWidth: 1,
    },
    {
      field: "name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
      field: "clinic",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
    {
      field: "doctor",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "description",
      headerName: "question",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 300,
    },
  ];
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "dashboard/allConsultation",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack alignItems={"start"} width={"100%"} spacing={4}>
      <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
        consultations
      </Typography>
      <BasicTable columns={consultations} rows={data} />
    </Stack>
  );
};

export default Consultation;
