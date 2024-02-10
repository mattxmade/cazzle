"use client";

import Image from "next/image";
import NextLink from "next/link";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type ImageGrid = {
  imageData: { src: string | null; alt?: string }[];
  link: string;
};

const ImageGrid = ({ imageData, link }: ImageGrid) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const additionalImages =
    imageData.length === 1
      ? null // NoItemCard x2
      : imageData.length === 2
      ? [imageData[1]] // NoItemCard x1
      : imageData.filter((data, i) => i > 0 && i < 3 && data);

  return (
    <Grid container sx={{ height: 435 }}>
      <Grid xs={12} sm={12} md={8} height="inherit" paddingRight={"4px"}>
        {
          imageData.length && imageData[0].src ? (
            <Button
              fullWidth
              component={NextLink}
              href={`${link + 0}`}
              aria-label="listing image 1"
              sx={{
                height: "inherit",
                overflow: "hidden",
              }}
            >
              <Image
                fill
                priority
                src={imageData[0].src}
                alt={"lsting image " + 1}
                style={{ objectFit: "cover" }}
              />
            </Button>
          ) : null // TODO: <NoImageCard/>
        }
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
            ? additionalImages.map(
                (item, i) =>
                  item.src ? (
                    <Button
                      fullWidth
                      key={"image_" + i}
                      aria-label={"listing image " + i + 1}
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
                        alt={"listing image " + i + 1}
                        style={{ objectFit: "cover" }}
                      />
                    </Button>
                  ) : null // TODO: <NoImageCard/>
              )
            : null}
        </Grid>
      )}
    </Grid>
  );
};

export default ImageGrid;
