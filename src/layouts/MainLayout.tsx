import React, { FC, PropsWithChildren, useEffect } from "react";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Link, Stack } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { IRootState } from "src/data/store";
import { useLogoutMutation } from "src/data/api";
import { API_URL } from "src/config/constants";

export interface IMainLAyoutProps extends PropsWithChildren {}

const MainLayout: FC<IMainLAyoutProps> = (props) => {
  const [logout, { isSuccess: isLoggedOut, isLoading }] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const gotTo = useNavigate();
  const client = useSelector((state: IRootState) => state.auth.account);
  const avatarHost = client?.avatar?.startsWith("http") ? "" : API_URL;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotToProfile = () => {
    handleClose();
    gotTo("/profile");
  };

  const handleLogout = () => {
    logout(null);
    handleClose();
    //clear cookie
    document.cookie = "connect.sid" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  useEffect(() => {
    if (!isLoading && isLoggedOut) gotTo("/");
  }, [isLoggedOut]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit" sx={{ flexGrow: 1 }} underline="none">
            <Stack direction="row" spacing={1} alignItems="center">
              <CameraIcon sx={{ mr: 1 }} />
              <Typography variant="h6" color="inherit" noWrap component="div">
                Photo Album
              </Typography>
            </Stack>
          </Link>
          <Typography variant="h6" color="inherit" noWrap component="p">
            {client?.fullName}
          </Typography>
          <IconButton size="large" onClick={handleMenu} color="inherit" sx={{ ml: "auto" }} disabled={!Boolean(client)}>
            {Boolean(client) && <img src={`${avatarHost}${client?.avatar}`} alt="" width={30} height={30} />}
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={gotToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default MainLayout;
