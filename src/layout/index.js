import * as React from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import { useSelector } from "react-redux";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";

export default function LayOut({ children }) {
  const [open, setOpen] = React.useState(false);
  const isAuthed = useSelector((state) => state.auth.isAuthed);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthed ? (
        <>
          <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <SideBar open={open} />
        </>
      ) : null}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isAuthed ? "50px 80px 50px " : 0,
          mt: isAuthed ? "60px" : 0,
          minHeight: `calc(100vh - 60px)`,
          bgcolor: "#f4f4f4",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
