import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress, Pagination, Stack, styled } from "@mui/material";
import { getRows } from "./getRows";
import { useEffect } from "react";

export default function BasicTable({ rows, columns }) {
  const StyledTable = styled(DataGrid)(({ theme }) => ({
    border: "none",
    minHeight: "80vh",
    color: "#0A0A0A",
    fontWeight: 500,
    fontSize: "0.9rem",
    "& .paxton-table--row": {
      border: "none",
      marginTop: "25px",
      marginBottom: "25px",
      backgroundColor: "#fff",
    },
    "& .paxton-table--cell": {
      border: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#fff",
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#fff",
    },
  }));

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
        component={Pagination}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        // components={{
        //   LoadingOverlay: LinearProgress,
        // }}
        // loading={filteredRows === [] ? true : false}
        getRowClassName={() => "paxton-table--row"}
      />
    </Stack>
  );
}