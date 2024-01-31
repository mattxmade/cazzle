"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import MediaCarousel from "./MediaCarousel";
import MediaGalleryAside from "./MediaGalleryAside";

export type MediaGalleryProps = {
  mediaData: { src: string; alt: string; type: string }[];
  initPosition: number;
};

const MediaGallery = ({ mediaData, initPosition }: MediaGalleryProps) => {
  return (
    <Container
      component="article"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container component="header"></Container>
      <Box component="main" display={"flex"} flexGrow={1}>
        <Box>
          <MediaGalleryAside
            mediaData={mediaData}
            initPosition={initPosition}
          />
        </Box>
        <MediaCarousel mediaData={mediaData} showControls />
      </Box>
      <Container component="footer"></Container>
    </Container>
  );
};

export default MediaGallery;
