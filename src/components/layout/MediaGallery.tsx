"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import MediaCarousel from "./MediaCarousel";
import MediaGalleryAside from "./MediaGalleryAside";
import BackButton from "../ui/buttons/BackButton";
import { MediaData } from "@/types";

type GalleryProps = {
  initItem: number;
  showGallery?: (show: boolean, item: number) => void;
} & MediaData;

const MediaGallery = ({ mediaData, initItem, showGallery }: GalleryProps) => {
  const clientRouter = useRouter();
  const clientParams = useParams() as { propertyId: string };

  const [currentItem, setCurrentItem] = useState(initItem - 1);

  const handleSelection = useCallback(
    (item: number) => {
      setCurrentItem(item);

      clientParams["propertyId"] &&
        clientRouter.replace(
          `/properties/${clientParams["propertyId"]}/media?media=${item + 1}`
        );
    },
    [clientParams, clientRouter]
  );

  const navigateBack = () => {
    clientRouter.back();
  };

  return (
    <Container
      disableGutters
      component="article"
      maxWidth="xl"
      sx={{
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
        sx={{ display: "flex", padding: 2 }}
      >
        <BackButton icon="arrow" onClick={navigateBack}>
          Back
        </BackButton>
        <Divider />
      </Container>
      <Box
        component="main"
        gap={2}
        display={"flex"}
        flexGrow={1}
        overflow="hidden"
      >
        <Box component="aside" className="main__media-gallery__aside">
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
          sx={{ height: "100%", display: "flex", alignItems: "center" }}
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
