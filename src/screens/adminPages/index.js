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

const AdminPages = () => {
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
      field: "name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
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
          <IconButton key={row.id} onClick={() => navigate(`/page/${row.id}`)}>
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
      "https://jihadm33.sg-host.com/public/api/dashboard/deletePage",
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
        url: "/dashboard/pages",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack spacing={4}>
      <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
        pages
      </Typography>
      <Stack alignItems={"start"} width={"100%"}>
        <Button onClick={() => navigate("/create-page")}>Add new page</Button>
        <ConfirmDialog
          open={confirmOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
          id={IdTodelete}
        />
        <BasicTable columns={offers} rows={data ? data : []} />
      </Stack>
    </Stack>
  );
};

export default AdminPages;
