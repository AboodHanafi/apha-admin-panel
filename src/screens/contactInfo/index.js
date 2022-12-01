import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import ConfirmDialog from "../../components/confirmationMessage";
import { CustomButton } from "../../GlobalStyle";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [IdTodelete, setIdTodelete] = useState("");
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
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
          <IconButton
            key={row.id}
            onClick={() => navigate(`/contact/${row.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton key={row.id} onClick={() => handleOpenConfirm(row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  const handleOpenConfirm = (id) => {
    setConfirmOpen(true);
    setIdTodelete(id);
  };
  const handleClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      "https://jihadm33.sg-host.com/public/api/dashboard/deleteContact",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: IdTodelete,
        },
      }
    );
    if (data.status) {
      getData();
      toast.success("deleted succssfully");
    }
  };

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
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
          contact information
        </Typography>

        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"15%"}
          onClick={() => navigate("/create-contact")}
        >
          Add Contact
        </CustomButton>
        <ConfirmDialog
          open={confirmOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
          id={IdTodelete}
        />
      </Stack>

      <BasicTable columns={offers} rows={data ? data : []} />
    </Stack>
  );
};

export default ContactInfo;
