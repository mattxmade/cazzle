"use client";

import Image from "next/image";
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
  console.log(props.item);

  return (
    <Card
      elevation={8}
      sx={{
        height: "100%",
        overflowY: "overlay",
        padding: "1rem 1.4rem 0 0.5rem",
      }}
    >
      <ImageList cols={props.columns}>
        {props.mediaData.map((item, i) => (
          <ImageListItem key={item.src + i}>
            <Button
              sx={{
                overflow: "hidden",
                borderRadius: "0.2rem",
                backgroundColor: props.item === i ? "lightgrey" : "",
              }}
              aria-label={"select" + item.src}
              onClick={() => props.handleSelection(i)}
            >
              <Box
                sx={{
                  width: 160,
                  height: 105,
                  overflow: "hidden",
                  borderRadius: "0.2rem",
                }}
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
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
