import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { CustomButton } from "../../GlobalStyle";
import { Stack } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ src, alt, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenImage = () => {
    window.open(src);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogContent>
        <img
          width={"400px"}
          height={"300px"}
          style={{
            objectFit: "contain",
          }}
          src={src}
          alt={alt}
        />
      </DialogContent>
      <DialogActions>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          width={"100%"}
          id="Button"
        >
          <CustomButton
            textcolor="#f4f4f4"
            variant="contained"
            sx={{
              bgcolor: "#0E4C8F",
            }}
            width={"10%"}
            onClick={handleOpenImage}
          >
            full
          </CustomButton>
          <CustomButton
            border={"1px solid #0E4C8F"}
            textcolor="#0E4C8F"
            variant="contained"
            sx={{
              bgcolor: "#fff",
            }}
            width={"10%"}
            onClick={handleClose}
          >
            close
          </CustomButton>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
}
