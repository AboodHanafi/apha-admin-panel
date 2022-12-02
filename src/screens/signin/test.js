import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { signInThunk } from "../../redux/features/auth/authActions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Images } from "../../assets";
import { CustomButton, CustomizedTextField } from "../../GlobalStyle";
import { Stack } from "@mui/system";

export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => state.auth.isAuthed);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const res = await dispatch(
        signInThunk({
          email: data.get("email"),
          password: data.get("password"),
        })
      );
      if (signInThunk.fulfilled.match(res)) {
        toast.success(
          "تم تسجيل الدخول بنجاح ... جاري تحويلك إلى الصفحة الرئيسية"
        );
      } else if (signInThunk.rejected.match(res)) {
        toast.error("خطأ في رقم الهاتف أو كلمة المرور");
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    if (isAuthed) {
      navigate("/");
    }
  }, [isAuthed]);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "end",
      }}
    >
      <CssBaseline />

      <Grid
        bgcolor={"rgba(27, 31, 35, 1)"}
        item
        xs={12}
        sm={7}
        md={4}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img width={"120px"} height={"100px"} src={Images.logo} alt="" />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <CustomizedTextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              placeholder="email"
              autoComplete="email"
              autoFocus
            />
            <CustomizedTextField
              margin="normal"
              required
              fullWidth
              placeholder="password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"80px"}
            >
              <FormControlLabel
                sx={{
                  color: "rgba(244, 244, 244, 1)",
                }}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Link
                underline="none"
                color={"rgba(11, 184, 79, 1)"}
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Stack>

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              textcolor="rgba(108, 163, 222, 1)"
              boxshadow="0px 0px 4px 4px rgba(160, 179, 197, 0.8)"
              sx={{ mt: 3, mb: 2, bgcolor: "#F4F4F4" }}
            >
              Sign In
            </CustomButton>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
            >
              <Typography color={"rgba(244, 244, 244, 1)"}>
                Don't have an account ?
              </Typography>
              <Link underline="none" href="#" variant="body2">
                {"Sign Up"}
              </Link>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
