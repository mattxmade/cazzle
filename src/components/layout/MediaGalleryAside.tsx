"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { MediaData } from "@/types";

type AsideProps = {
  item: number;
  columns?: number;
  handleSelection: (newPositon: number) => void;
} & MediaData;

const MediaGalleryAside = (props: AsideProps) => {
  return (
    <Card elevation={8} sx={{ height: "100%", overflowY: "scroll" }}>
      <ImageList cols={props.columns}>
        {props.mediaData.map((item, i) => (
          <ImageListItem key={item.src}>
            <Button
              sx={{
                overflow: "hidden",
                borderRadius: "0.2rem",
              }}
              aria-label={"select" + item.src}
              onClick={() => props.handleSelection(i)}
            >
              <Box
                sx={{
                  height: 105,
                  overflow: "hidden",
                  borderRadius: "0.2rem",
                }}
              >
                <img
                  srcSet={`${item.src}?w=160&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src}?w=160&fit=crop&auto=format`}
                  alt={item.alt}
                  loading="lazy"
                />
              </Box>
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
};

export default MediaGalleryAside;
