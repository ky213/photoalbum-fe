import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  LinearProgress,
  Snackbar,
} from "@mui/material";

import { ILoginRequest } from "src/data/types/client";
import { useLoginMutation } from "src/data/api";

export interface ILoginPageProps {}

const LoginPage = (props: ILoginPageProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { data, error, isLoading, isSuccess }] = useLoginMutation();
  const gotTo = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm<ILoginRequest>();

  useEffect(() => {
    if (!isLoading && isSuccess && !error) {
      setErrorMessage(null);
      setTimeout(() => {
        gotTo("/profile");
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ([401, 403].includes(error.originalStatus)) setErrorMessage("Wrong email or password!");
      else setErrorMessage("Unkown error.");
    }
  }, [error]);

  const onSubmit = async (credentials: ILoginRequest) => {
    login(credentials);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isLoading && <LinearProgress />}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={Boolean(data)}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Login Sucess
            </Alert>
          </Snackbar>
          {
            //@ts-ignore
            errorMessage && <Alert severity="error">{errorMessage}</Alert>
          }
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...registerField("email", { required: true, pattern: /^\S+@\S+\.\S+$/g })}
                  error={Boolean(fieldErrors.email)}
                  helperText={Boolean(fieldErrors.email) && "Must be a valid email address."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...registerField("password", {
                    required: true,
                  })}
                  error={Boolean(fieldErrors.password)}
                  helperText={Boolean(fieldErrors.password) && "Password required"}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
