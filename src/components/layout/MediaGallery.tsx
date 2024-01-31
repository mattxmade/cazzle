"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MediaCarousel from "./MediaCarousel";

type MediaGalleryProps = {
  mediaData: { src: string; alt: string; type: string }[];
  initPosition: number;
};

const MediaGalleryAside = ({ mediaData, initPosition }: MediaGalleryProps) => {
  return (
    <Card elevation={3} sx={{ width: "fit-content", padding: "1rem" }}>
      <ImageList
        gap={12}
        cols={2}
        rowHeight={120}
        sx={{ width: "fit-content" }}
      >
        {mediaData.map((item) => (
          <ImageListItem
            key={item.src}
            sx={{
              width: 160,
              height: "auto",
              overflow: "hidden",
              borderRadius: "0.2rem",
            }}
          >
            <Button sx={{ padding: 0 }}>
              <img
                srcSet={`${item.src}?w=180&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.src}?w=180&fit=crop&auto=format`}
                alt={item.alt}
                loading="lazy"
              />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
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
