import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, Container } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

import { IPhoto } from "src/data/types/photo";
import { IRootState } from "src/data/store";
import { useGetPhotosQuery } from "src/data/api";
import { API_URL } from "src//config/constants";

const ProfilePage = (props: any) => {
  const query = useGetPhotosQuery(null);
  const photos = useSelector((state: IRootState) => state.photos.list);
  const client = useSelector((state: IRootState) => state.auth.account);

  return (
    <Container maxWidth="lg">
      {Boolean(!client) && <Navigate to="/login" />}
      <ImageList sx={{ height: "80vh" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">My Album</ListSubheader>
        </ImageListItem>
        {photos.map((photo: IPhoto, i: number) => (
          <ImageListItem key={i}>
            <img
              srcSet={`${API_URL}${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${API_URL}${photo.url}?w=248&fit=crop&auto=format`}
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
  );
};

export default ProfilePage;
