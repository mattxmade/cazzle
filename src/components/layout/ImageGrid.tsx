"use client";

import Link from "next/link";
import Image from "next/image";
import NextLink from "next/link";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NoItemCard from "../NoItemCard";

type ImageGridProps = {
  imageData: { src: string | null; alt?: string }[] | null;
  link: string;
};

const ImageGrid = ({ imageData, link }: ImageGridProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const additionalImages = !imageData
    ? [{ image: null }, { image: null }]
    : imageData.length === 1
    ? [{ image: null }]
    : imageData.length === 2
    ? [{ image: imageData[1] }, { image: null }]
    : [{ image: imageData[1] }, { image: imageData[2] }];

  return (
    <Grid container sx={{ height: 435 }}>
      <Grid xs={12} sm={12} md={8} height="inherit" paddingRight={"4px"}>
        <Button
          fullWidth
          aria-disabled={!imageData?.length ? true : false}
          aria-label={!imageData?.length ? "listing image 1" : "no image"}
          sx={{
            height: "inherit",
            overflow: "hidden",
            cursor: imageData?.length ? "pointer" : "auto",
          }}
        >
          {imageData && imageData[0]?.src ? (
            <Link
              href={`${link + 1}`}
              style={{ color: "initial", textDecoration: "none" }}
            >
              <Image
                fill
                priority
                src={imageData[0].src}
                alt={"lsting image " + 1}
                style={{ objectFit: "cover" }}
              />
            </Link>
          ) : (
            <NoItemCard variant="image" />
          )}
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
          {additionalImages
            ? additionalImages.map((item, i) => (
                <Button
                  fullWidth
                  key={"image_" + i}
                  aria-disabled={!item.image ? true : false}
                  aria-label={
                    item.image ? "listing image " + i + 1 : "no image"
                  }
                  sx={{
                    height: "calc(50% - 4px)",
                    overflow: "hidden",
                    position: "relative",
                    alignSelf: i === 0 ? "start" : "end",
                    cursor: item.image ? "pointer" : "auto",
                  }}
                >
                  {item.image && item.image.src ? (
                    <Link
                      href={`${link + (i + 2)}`}
                      style={{ color: "initial", textDecoration: "none" }}
                    >
                      <Image
                        fill
                        src={item.image.src}
                        alt={"listing image " + i + 1}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  ) : (
                    <NoItemCard variant="image" />
                  )}
                </Button>
              ))
            : null}
        </Grid>
      )}
    </Grid>
  );
};

export default ImageGrid;
