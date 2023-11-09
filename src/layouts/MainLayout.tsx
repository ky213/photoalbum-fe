import React, { FC, PropsWithChildren, useEffect } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, AppBar, Toolbar, Typography, Container, Stack, Button, Link } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { IRootState } from "src/data/store";
import { useLogoutMutation } from "src/data/api";

export interface IMainLAyoutProps extends PropsWithChildren {}

const MainLayout: FC<IMainLAyoutProps> = (props) => {
  const [logout, { isSuccess, isLoading }] = useLogoutMutation();
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
    logout(null);
    handleClose();
    //clear cookie
    document.cookie = "connect.sid" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  useEffect(() => {
    if (!isLoading && isSuccess) gotTo("/");
  }, [isSuccess]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap component="div" sx={{ flexGrow: 1 }}>
            Photo Album
          </Typography>
          <Typography variant="h6" color="inherit" noWrap component="p">
            {client?.fullName}
          </Typography>
          <IconButton size="large" onClick={handleMenu} color="inherit" sx={{ ml: "auto" }} disabled={!Boolean(client)}>
            {Boolean(client) && <img src={`http://localhost:3000${client?.avatar}`} alt="" width={30} height={30} />}
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => gotTo("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default MainLayout;
