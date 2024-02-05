"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Button from "@mui/material/Button";

import Image from "next/image";
import NextLink from "next/link";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
type ImageGrid = {
  imageData: { src: string; alt: string }[];
  link: string;
};

const ImageGrid = ({ imageData, link }: ImageGrid) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ height: 435 }}>
      <Grid xs={12} sm={12} md={8} height="inherit" paddingRight={"4px"}>
        <Button
          fullWidth
          component={NextLink}
          href={`${link + 0}`}
          aria-label="image 1"
          sx={{
            height: "inherit",
            overflow: "hidden",
          }}
        >
          <Image
            fill
            priority
            src={imageData[0].src}
            alt={imageData[0].alt}
            style={{ objectFit: "cover" }}
          />
        </Button>
      </Grid>

      {matches ? null : (
        <Grid
          container
          xs={12}
          sm={12}
          md={4}
          height="inherit"
          paddingLeft={"4px"}
        >
          {[imageData[1], imageData[2]].map((item, i) => (
            <Button
              fullWidth
              key={"image_" + item.alt + "_" + i}
              aria-label={"image " + i + 1}
              sx={{
                height: "calc(50% - 4px)",
                overflow: "hidden",
                position: "relative",
                alignSelf: i === 0 ? "start" : "end",
              }}
            >
              <Image
                fill
                src={item.src}
                alt={item.alt}
                style={{ objectFit: "cover" }}
              />
            </Button>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ImageGrid;
