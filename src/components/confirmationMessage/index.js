import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider } from "@mui/material";

export default function ConfirmDialog({ open, handleClose, handleDelete }) {
  return (
    <Dialog
      open={open ? true : false}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          color: "#1d1d1d",
        }}
        fontWeight={600}
        id="alert-dialog-title"
      >
        Confirm Delete
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText
          sx={{
            color: "#1d1d1d",
          }}
          fontWeight={600}
          id="alert-dialog-description"
        >
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Confirm
        </Button>
        <Button variant="contained" onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
