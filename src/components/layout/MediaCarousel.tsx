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
  return (
    <>
      <Button>
        <ArrowBackIosIcon />
      </Button>
      <Container sx={{ position: "relative", overflow: "hidden" }}>
        {props.mediaData.map((item, i) => (
          <Box
            key={"carousel_" + item.src}
            sx={{
              display: i > 0 ? "none" : "grid",
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
              {props.item} of {props.mediaData.length}
            </Typography>
          </Box>
        ))}
      </Container>
      <Button>
        <ArrowForwardIosIcon />
      </Button>
    </>
  );
};

export default MediaCarousel;
