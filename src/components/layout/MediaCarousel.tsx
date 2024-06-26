"use client";

import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { MediaData } from "@/types";

type MediaCarouselProps = {
  item: number;
  maxWidth?: number;
  showControls?: boolean;
  children?: React.ReactNode;
  handleNavigation: (item: number) => void;
} & MediaData;

const MediaCarousel = (props: MediaCarouselProps) => {
  const slideTotal = props.mediaData.length - 1;

  const prevSlide = (e: React.MouseEvent) =>
    props.item > 0 && props.handleNavigation(props.item - 1);

  const nextSlide = (e: React.MouseEvent) =>
    props.item !== slideTotal && props.handleNavigation(props.item + 1);

  return (
    <>
      <Button aria-label="previous gallery slide" onClick={prevSlide}>
        <ArrowBackIosIcon />
      </Button>
      <Container
        sx={{ position: "relative", overflow: "hidden", height: "100%" }}
      >
        {props.mediaData.map((item, i) =>
          item.src ? (
            <Stack
              key={"carousel_" + item.src + i}
              height="95%"
              alignItems="center"
              display={i !== props.item ? "none" : "flex"}
            >
              <Box flex="auto" width="100%" position="relative">
                <Image
                  fill
                  key={item.src}
                  src={item.src}
                  alt={`listing image ${i + 1}`}
                  loading="lazy"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Typography>{`${props.item + 1} of ${
                slideTotal + 1
              }`}</Typography>
            </Stack>
          ) : null
        )}
      </Container>
      <Button aria-label="next gallery slide" onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </Button>
    </>
  );
};

export default MediaCarousel;
