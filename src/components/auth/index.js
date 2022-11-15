import { CircularProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const WithAuth = ({ children }) => {
  const isAuthed = useSelector((state) => state.auth.isAuthed);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthed) {
      navigate("/signin");
    }
  }, [isAuthed]);
  if (isAuthed) {
    return <>{children}</>;
  }
  return (
    <Stack width={"100%"} alignItems={"center"} marginTop={"100px"}>
      <h1>You Must login before </h1>
      <CircularProgress />
    </Stack>
  );
};

export default WithAuth;
