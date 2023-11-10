import React, { useEffect, useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  FormHelperText,
  MenuItem,
  Alert,
  LinearProgress,
  Snackbar,
  InputLabel,
} from "@mui/material";

import { INewClient } from "src/data/types/client";
import { IPhotoObject } from "src/data/types/photo";
import { useRegisterMutation } from "src/data/api";
import { toBase64 } from "src/shared/utils/files";

export interface IRegisterPageProps {}

const RegisterPage = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [register, { data, error, isLoading, isSuccess }] = useRegisterMutation();
  const gotTo = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm<INewClient>();

  useEffect(() => {
    if (!isLoading && isSuccess && !error) {
      setTimeout(() => {
        gotTo("/login");
      }, 2000);
    }
  }, [isLoading]);

  const onSubmit = async (newClient: INewClient) => {
    try {
      const processedPhotos: IPhotoObject[] = [];
      for (const photo of photos) {
        const result: string = await toBase64(photo);

        processedPhotos.push({
          name: photo.name.split(".").shift() as string,
          extension: photo.type.split("/").pop() as string,
          data: result.split(",").pop() as string,
        });
      }
      newClient.photos = processedPhotos;
      register(newClient);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Snackbar open={Boolean(data)} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Client registerd Sucessfully
          </Alert>
        </Snackbar>
        {error && (
          //@ts-ignore
          <Alert severity="error">{error.data?.message}</Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register new client
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...registerField("firstName", { required: true, minLength: 2, maxLength: 50 })}
                error={Boolean(fieldErrors.firstName)}
                helperText={Boolean(fieldErrors.firstName) && "Must be between 2 and 50 characters."}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...registerField("lastName", { required: true, minLength: 2, maxLength: 50 })}
                error={Boolean(fieldErrors.lastName)}
                helperText={Boolean(fieldErrors.lastName) && "Must be between 2 and 50 characters."}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...registerField("email", { pattern: /^\S+@\S+\.\S+$/g })}
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
                  minLength: 6,
                  maxLength: 50,
                  validate: (v) => Boolean(v.match(/\d/g)),
                })}
                error={Boolean(fieldErrors.password)}
                helperText={
                  Boolean(fieldErrors.password) &&
                  "Must be between 6 and 50 characters and includes one number minimum."
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="avatar"
                label="Avatar link"
                fullWidth
                {...registerField("avatar", {
                  required: false,
                  pattern: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
                })}
                error={Boolean(fieldErrors.avatar)}
                helperText={Boolean(fieldErrors.avatar) && "Must be a valid url"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl error={Boolean(fieldErrors.role)} fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select id="role" labelId="role-label" fullWidth {...registerField("role", { required: true })}>
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="CLIENT">Client</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
                {Boolean(fieldErrors.role) && <FormHelperText color={"danger"}>Must select a role</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox color="primary" {...registerField("active")} />} label="Active" />
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <MuiFileInput
              placeholder="Insert photos"
              inputProps={{ accept: ".png, .jpeg, .jpg" }}
              onChange={setPhotos}
              value={photos}
              multiple
              required
              error={touchedFields.password && photos && photos.length < 1}
              helperText={"At least one photo should be inserted"}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
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
