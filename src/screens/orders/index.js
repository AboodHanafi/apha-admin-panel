import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";
import StatusDialog from "../../components/editStatus";

const Orders = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);
  const [open, setopen] = useState(false);
  const [idToEdit, setidToEdit] = useState("");
  const [oneOrderStatus, setOneOrderStatus] = useState("");
  const orders = [
    {
      field: "index",
      headerName: "#",
    },
    {
      field: "user_id",
      headerName: "name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "offer_id",
      headerName: "offer name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "code",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "created_at",
      headerName: "date",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <>
          <Typography
            fontWeight={500}
            fontSize={14}
            sx={{
              color: "#F4F4F4",
              borderRadius: "10px",
              minWidth: "100px",
              background:
                row.status === "Pending"
                  ? "#F59D18"
                  : row.status === "Completed"
                  ? "#0CA437"
                  : "#BF1C1C",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {row.status}
          </Typography>
          <Tooltip title="Edit Status" placement="top">
            <IconButton
              onClick={() => handleOpen(row.id, row.status)}
              key={row.id}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const handleOpen = (id, status) => {
    setidToEdit(id);
    setOneOrderStatus(status);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const getData = async () => {
    const resp = await dispatch(
      getAdminDataThunk({
        url: "/dashboard/orders",
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack alignItems={"start"} width={"100%"} spacing={4}>
      <Typography fontWeight={600} fontSize={"16px"} color={"#0A0A0A"}>
        Orders
      </Typography>
      <StatusDialog
        open={open}
        handleClose={handleClose}
        oneOrderStatus={oneOrderStatus}
        id={idToEdit}
        getData={getData}
      />
      <BasicTable columns={orders} rows={data ? data : []} />
    </Stack>
  );
};

export default Orders;
