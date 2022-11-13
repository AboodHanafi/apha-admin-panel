import * as React from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../navBar";
import SideBar from "../sideBar";
import { DrawerHeader } from "../sideBar/style";
import { useSelector } from "react-redux";

export default function LayOut({ children }) {
  const [open, setOpen] = React.useState(true);
  const isAuthed = useSelector((state) => state.auth.isAuthed);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthed ? (
        <>
          <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        </>
      ) : null}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {isAuthed && <DrawerHeader />}
        {children}
      </Box>
    </Box>
  );
}
