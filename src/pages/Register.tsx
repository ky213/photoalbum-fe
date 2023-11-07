import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LockOutlined, CloudUpload } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";

import { IRoles } from "src/data/types/common";
import { useRegisterMutation } from "src/data/api";

export interface IRegisterPageProps {}

const RegisterPage = () => {
  const [photos, setPhotos] = useState<File[] | undefined>([]);
  const [register, { data, error, isLoading }] = useRegisterMutation();

  useEffect(() => {
    register({
      firstName: "string",
      lastName: "string",
      email: "string",
      password: "string",
      role: IRoles.ADMIN,
      active: true,
      photos: [],
      avatar: "",
    });
  }, []);

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register new client
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="avatar" name="avatar" label="Avatar link" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Select id="role" name="role" labelId="role-label" required fullWidth>
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="CLIENT">Client</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox value="active" color="primary" />} label="Active" />
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <MuiFileInput
              placeholder="Insert photos"
              inputProps={{ accept: ".png, .jpeg, .jpg" }}
              onChange={setPhotos}
              value={photos}
              multiple
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
