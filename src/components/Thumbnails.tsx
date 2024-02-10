"use client";

import Link from "next/link";
import Image from "next/image";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

const ImageListItemStyle = {
  width: 75,
  height: 75,
  display: "grid",
  overflow: "hidden",
  borderRadius: "0.2rem",
  backgroundColor: "lavender",
  ":hover": { cursor: "pointer" },
};

type ThumbnailsProps = {
  slug: string;
  additional: number | null;
  thumbnails: { src: string | null; alt?: string; type?: string }[];
};

const Thumbnails = ({ slug, additional, thumbnails }: ThumbnailsProps) => {
  return (
    <ImageList
      sx={{ gap: "0.8rem !important", display: "flex", flexWrap: "wrap" }}
    >
      {thumbnails.map((item, i) =>
        item.src ? (
          <ImageListItem key={item.src} sx={ImageListItemStyle}>
            <Link
              href={slug + `/media?media=${i + 1}`}
              style={{ width: 75, height: 75, position: "relative" }}
            >
              <Image
                fill
                src={item.src}
                alt={item.alt ?? "image " + i + 1}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </ImageListItem>
        ) : null
      )}

      {additional ? (
        <ImageListItem sx={ImageListItemStyle}>
          <Link
            href={slug + "/media?media=1"}
            style={{
              display: "grid",
              width: 75,
              height: 75,
              placeContent: "center",
              textDecoration: "none",
            }}
          >
            <Typography fontSize={"1.4rem"}>+{additional}</Typography>
          </Link>
        </ImageListItem>
      ) : null}
    </ImageList>
  );
};

export default Thumbnails;
