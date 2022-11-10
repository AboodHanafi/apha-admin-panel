import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Drawer, DrawerHeader } from "./style";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Images, sideBarItem } from "../../assets";

const SideBar = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon
            sx={{
              color: "#fff",
            }}
          />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Stack
        sx={{
          visibility: open ? "visible" : "hidden",
        }}
        alignItems={"center"}
        margin={"10px 0"}
      >
        <img src={Images.logo} alt="logo" />
      </Stack>
      <List>
        {sideBarItem.map((item) => (
          <ListItem
            onClick={() => navigate(item.path)}
            key={item.id}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
