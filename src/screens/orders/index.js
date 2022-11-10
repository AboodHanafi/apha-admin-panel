import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "../../components/table";
import { getAdminDataThunk } from "../../redux/features/adminData/adminActions";

const Orders = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminData.adminData);

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
      field: "status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Typography
          fontWeight={500}
          fontSize={14}
          sx={{
            color: "#F4F4F4",
            borderRadius: "10px",
            background:
              row.status === "Pending"
                ? "#F59D18"
                : row.status === "موافق عليه"
                ? "#0CA437"
                : "#BF1C1C",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {row.status}
        </Typography>
      ),
    },
    {
      field: "created_at",
      headerName: "date",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <IconButton key={row.id} onClick={() => console.log(row.id)}>
          <EditIcon id={row.id} />
        </IconButton>
      ),
    },
  ];
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
      <BasicTable columns={orders} rows={data ? data : []} />
    </Stack>
  );
};

export default Orders;
