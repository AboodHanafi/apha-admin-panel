import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const offers = [
    {
      field: "index",
      headerName: "#",
    },
    {
      field: "value",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "type",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <>
          <IconButton key={row.id} onClick={() => console.log(row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton key={row.id} onClick={() => console.log(row.index)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "contact",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack spacing={4}>
      <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
        contact information
      </Typography>
      <Stack alignItems={"start"} width={"100%"}>
        <Button>Add new contact info</Button>
        <BasicTable columns={offers} rows={data ? data : []} />
      </Stack>
    </Stack>
  );
};

export default ContactInfo;
