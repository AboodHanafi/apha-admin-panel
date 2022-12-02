import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import { Delete, Visibility } from "@mui/icons-material";
import CustomizedDialogs from "../../components/popUp";
import ConfirmDialog from "../../components/confirmationMessage";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../GlobalStyle";

const Offers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
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
      field: "title",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "price",
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
      field: "expier",
      headerName: "expiration date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "description",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
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
    {
      field: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      renderCell: ({ row }) => (
        <>
          <IconButton key={row.id} onClick={() => navigate(`/offer/${row.id}`)}>
            <EditIcon
              sx={{
                fill: "rgba(249, 170, 28, 1)",
              }}
            />
          </IconButton>
          <IconButton key={row.id} onClick={() => handleOpenConfirm(row.id)}>
            <Delete
              sx={{
                fill: "rgba(231, 20, 20, 1)",
              }}
            />
          </IconButton>
        </>
      ),
    },
  ];
  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "dashboard/offers",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const handleView = (image) => {
    setImage(image);
    setOpen(true);
  };

  const handleOpenConfirm = (id) => {
    setConfirmOpen(true);
    setIdTodelete(id);
  };

  const handleClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      "https://jihadm33.sg-host.com/public/api/dashboard/deleteOffer",
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
  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
          Offers
        </Typography>

        <CustomButton
          CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"15%"}
          onClick={() => navigate("/create-offer")}
        >
          Add offer
        </CustomButton>
        <CustomizedDialogs
          src={image}
          alt={image}
          open={open}
          setOpen={setOpen}
        />
        <ConfirmDialog
          open={confirmOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
          id={IdTodelete}
        />
      </Stack>
      <BasicTable columns={offers} rows={data} />
    </Stack>
  );
};

export default Offers;
