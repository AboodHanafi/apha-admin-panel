import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider, FormLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CustomButton } from "../../GlobalStyle";

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
    { id: 1, status: "completed" },
    { id: 2, status: "pending" },
    { id: 3, status: "scheduled" },
    { id: 4, status: "canceled" },
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
          color: "rgba(10, 10, 10, 1)",
        }}
        fontWeight={600}
        fontSize={"16px"}
        id="alert-dialog-title"
      >
        Edit Status
      </DialogTitle>
      <DialogContent
        sx={{
          width: "300px",
          height: "200px",
        }}
      >
        <FormLabel
          sx={{
            color: "#0A0A0A",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Status
        </FormLabel>
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
        <CustomButton
          textcolor="#f4f4f4"
          variant="contained"
          sx={{
            bgcolor: "#0E4C8F",
          }}
          width={"10%"}
          onClick={() => {
            handleEdit();
            handleClose();
          }}
        >
          Confirm
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
          Cancel
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
