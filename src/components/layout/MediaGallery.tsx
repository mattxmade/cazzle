"use client";

import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import MediaCarousel from "./MediaCarousel";
import MediaGalleryAside from "./MediaGalleryAside";
import { MediaData } from "@/types";

import Divider from "@mui/material/Divider";

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
      maxWidth={false}
      sx={{
        maxWidth: 2400,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container
        disableGutters
        component="header"
        maxWidth={false}
        sx={{ paddingTop: 10 }}
      >
        <Divider />
      </Container>
      <Box
        component="main"
        gap={2}
        display={"flex"}
        flexGrow={1}
        overflow="hidden"
      >
        <Box component="aside">
          <MediaGalleryAside
            columns={2}
            mediaData={mediaData}
            item={currentItem}
            handleSelection={handleSelection}
          />
        </Box>
        <Container
          disableGutters
          component="section"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MediaCarousel
            showControls
            item={currentItem}
            mediaData={mediaData}
            handleNavigation={handleSelection}
          />
        </Container>
      </Box>
      <Container component="footer"></Container>
    </Container>
  );
};

export default MediaGallery;
