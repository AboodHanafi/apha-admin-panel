import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Skeleton, Stack, styled } from "@mui/material";
import { getRows } from "./getRows";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BasicTable({ rows, columns, invoice }) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const isLoading = useSelector((state) => state.adminData.isLoading);

  const StyledTable = styled(DataGrid)(({ theme }) => ({
    border: "none",
    minHeight: invoice ? "40vh" : "70vh",
    color: "#0A0A0A",
    fontWeight: 500,
    fontSize: "0.9rem",
    // width: "auto",
    "& .paxton-table--row": {
      border: "none",
      marginTop: "15px",
      marginBottom: "15px",
      backgroundColor: "#fff",
    },
    "& .paxton-table--cell": {
      border: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#fff",
      width: "200vh",
      minwidth: "100vw",
    },
    "& .MuiDataGrid-footerContainer": {
      display: invoice ? "none" : "",
      backgroundColor: "#fff",
    },
  }));
  const LoadingSkeleton = () => (
    <Box
      sx={{
        height: "max-content",
        width: "100%",
      }}
    >
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
      ))}
    </Box>
  );

  if (!isLoading) {
    return (
      <Stack
        width={"100%"}
        sx={{
          backgroundColor: "#f4f4f4",
          boxShadow: "none",
        }}
        component={Paper}
      >
        <StyledTable
          rows={getRows(rows)}
          columns={columns}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 100]}
          pagination
          disableSelectionOnClick
          getRowClassName={() => "paxton-table--row"}
        />
      </Stack>
    );
  } else {
    return <LoadingSkeleton />;
  }
}
