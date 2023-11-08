import React from "react";
import { useSelector } from "react-redux";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { IPhoto } from "src/data/types/photo";
import { IRootState } from "src/data/store";
import { useGetPhotosQuery } from "src/data/api";

const ProfilePage = (props: any) => {
  const { data, error, isLoading, refetch } = useGetPhotosQuery(null);
  const photos = useSelector((state: IRootState) => state.photos.list);
  const client = useSelector((state: IRootState) => state.auth.account);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
          <Typography variant="h6" color="inherit" noWrap component="p">
            {client?.fullName}
          </Typography>
          <IconButton size="large" onClick={handleMenu} color="inherit" sx={{ ml: "auto" }}>
            <img src={`http://localhost:3000${client?.avatar}`} alt="" width={30} height={30} />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <ImageList sx={{ height: "80vh" }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">My Album</ListSubheader>
          </ImageListItem>
          {photos.map((photo: IPhoto, i: number) => (
            <ImageListItem key={i}>
              <img
                //TODO:use en variables for host
                srcSet={`http://localhost:3000${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`http://localhost:3000${photo.url}?w=248&fit=crop&auto=format`}
                alt={photo.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={photo.name}
                subtitle={photo.createdAt}
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${photo.name}`}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
};

export default ProfilePage;
