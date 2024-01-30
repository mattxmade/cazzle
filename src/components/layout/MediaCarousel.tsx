"use client";

import Container from "@mui/material/Container";

type MediaCarouselProps = {
  showControls?: boolean;
  mediaData: { src: string; alt: string; type: string }[];
};

const MediaCarousel = ({ mediaData, showControls }: MediaCarouselProps) => {
  return <Container>Media Carousel</Container>;
};

export default MediaCarousel;
