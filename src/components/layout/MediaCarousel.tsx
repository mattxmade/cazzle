"use client";

import Box from "@mui/material/Box";
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
      <Container sx={{ position: "relative", overflow: "hidden" }}>
        {props.mediaData.map((item, i) => (
          <Box
            key={"carousel_" + item.src + i}
            sx={{
              display: i !== props.item ? "none" : "grid",
            }}
          >
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              loading="lazy"
              width={"100%"}
            />
            <Typography>
              {props.item + 1} of {slideTotal + 1}
            </Typography>
          </Box>
        ))}
      </Container>
      <Button aria-label="next gallery slide" onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </Button>
    </>
  );
};

export default MediaCarousel;
