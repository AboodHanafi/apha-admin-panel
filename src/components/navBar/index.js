import { Avatar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AppBar } from "./style";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import BasicMenu from "../profileMenu";

const NavBar = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"} spacing={1} alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon
              fontSize="large"
              sx={{
                fill: "#0A0A0A",
              }}
            />
          </IconButton>
          <Typography fontWeight={600} color={"#0A0A0A"}>
            Abha Admin Panel
          </Typography>
        </Stack>
        <Stack spacing={3} direction={"row"} alignItems={"center"}>
          {/* <Typography fontWeight={400} fontSize={"13px"} color={"#0A0A0A"}>
            {userData.first_name}&nbsp;
            {userData.last_name}
          </Typography> */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
            }}
          >
            <Avatar
              id="basic-button"
              // aria-controls={openProfile ? "basic-menu" : undefined}
              // aria-haspopup="true"
              // aria-expanded={openProfile ? "true" : undefined}
              onClick={handleClick}
              sx={{ bgcolor: deepOrange[500] }}
            />
            <KeyboardArrowDownIcon
              onClick={handleClick}
              sx={{
                fill: "#0A0A0A",
              }}
            />
            <BasicMenu
              open={openProfile}
              handleClose={handleClose}
              anchorEl={anchorEl}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
