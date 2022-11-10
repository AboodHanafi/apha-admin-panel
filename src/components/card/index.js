import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ bgColor, title, counter }) {
  return (
    <Card sx={{ minWidth: 300, height: "100px", bgcolor: bgColor }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="#fff" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="#fff" gutterBottom>
          {counter}
        </Typography>
      </CardContent>
    </Card>
  );
}
