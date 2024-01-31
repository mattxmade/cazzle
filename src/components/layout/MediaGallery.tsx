"use client";

import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import MediaCarousel from "./MediaCarousel";
import MediaGalleryAside from "./MediaGalleryAside";
import { MediaData } from "@/types";

type MediaGalleryProps = {
  initItem: number;
} & MediaData;

const MediaGallery = ({ mediaData, initItem }: MediaGalleryProps) => {
  const [currentItem, setCurrentItem] = useState(initItem);

  const handleSelection = useCallback(
    (item: number) => {
      setCurrentItem(item);
    },
    [currentItem]
  );

  return (
    <Container
      disableGutters
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
            item={currentItem}
            handleSelection={handleSelection}
          />
        </Box>
        <MediaCarousel
          showControls
          item={currentItem}
          mediaData={mediaData}
          handleNavigation={handleSelection}
        />
      </Box>
      <Container component="footer"></Container>
    </Container>
  );
};

export default MediaGallery;
