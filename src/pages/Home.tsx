import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, AppBar, Toolbar, Typography, Container, Stack, Button, Link } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { IRootState } from "src/data/store";

export interface IHomePageProps {}

const HomePage = (props: IHomePageProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const gotTo = useNavigate();
  const client = useSelector((state: IRootState) => state.auth.account);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap component="div" sx={{ flexGrow: 1 }}>
            Photo Album
          </Typography>
          <IconButton size="large" onClick={handleMenu} color="inherit" disabled={!Boolean(client)}>
            <AccountCircle />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => gotTo("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"start"}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Grid item sx={{ mt: 22 }}>
          <Container maxWidth="sm" sx={{ backgroundColor: "rgb(0,0,0, 0.3)", padding: 5 }}>
            <Typography component="h1" variant="h2" align="center" color="white" gutterBottom>
              Easy & Reliable
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
              Manage your photos and albums in a modern and inuitive way.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" color="success" onClick={() => gotTo("/login")}>
                Login
              </Button>
              <Button variant="contained" onClick={() => gotTo("/register")}>
                Register
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
