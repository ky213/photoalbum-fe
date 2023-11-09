import React from "react";
import { useSelector } from "react-redux";
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, Container } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

import { IPhoto } from "src/data/types/photo";
import { IRootState } from "src/data/store";
import { useGetPhotosQuery } from "src/data/api";

const ProfilePage = (props: any) => {
  const { data, error, isLoading, refetch } = useGetPhotosQuery(null);
  const photos = useSelector((state: IRootState) => state.photos.list);

  return (
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
  );
};

export default ProfilePage;
