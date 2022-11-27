import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { dashboardItem } from "../../assets";

export default function BasicCard({ Icon, title, counter }) {
  return (
    <Card sx={{ minWidth: 210, height: "190px", boxShadow: "none" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            gap: "20px",
          }}
        >
          {Icon}
          <Typography
            fontSize={"13px"}
            fontWeight={600}
            color="#0E4C8F"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            fontSize={"13px"}
            fontWeight={600}
            color="#6CA3DE"
            gutterBottom
          >
            {counter}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
