import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider, MenuItem, Select } from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function StatusDialog({
  open,
  handleClose,
  oneOrderStatus,
  id,
  getData,
}) {
  const [orderStatus, setOrderStatus] = React.useState("");
  const token = localStorage.getItem("userToken");

  const handleEdit = async () => {
    const { data } = await axios.post(
      `https://jihadm33.sg-host.com/public/api/dashboard/status/order/${id}`,
      {
        id: id,
        status: orderStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.status) {
      toast.success("edited succssfully");
      getData();
    }
  };
  React.useEffect(() => {
    setOrderStatus(oneOrderStatus);
  }, [oneOrderStatus]);
  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const options = [
    { id: 1, status: "Completed" },
    { id: 2, status: "Pending" },
    { id: 3, status: "Rejected" },
  ];

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
        choose new status :
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          width: "300px",
          height: "200px",
        }}
      >
        <Select
          id="demo-simple-select"
          value={orderStatus}
          onChange={handleChange}
          sx={{
            width: "100%",
          }}
        >
          {options.map((item) => (
            <MenuItem key={item.id} value={item.status}>
              {item.status}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            handleEdit();
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
