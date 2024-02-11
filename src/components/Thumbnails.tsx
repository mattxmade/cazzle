"use client";

import Link from "next/link";
import Image from "next/image";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

import NoItemCard from "./NoItemCard";

const ImageListItemStyle = {
  width: 75,
  height: 75,
  display: "grid",
  position: "relative",
  overflow: "hidden",
  borderRadius: "0.2rem",
  backgroundColor: "lavender",
  ":hover": { cursor: "pointer" },
};

type ThumbnailsProps = {
  link: string;
  images: { src: string | null; alt?: string; type?: string }[] | null;
};

const Thumbnails = ({ link, images }: ThumbnailsProps) => {
  const thumbnails = images ? images.filter((image, i) => i <= 5 && image) : [];
  const additional = thumbnails.length > 6 ? thumbnails.length - 6 : null;

  return (
    <ImageList
      sx={{
        minHeight: 75,
        gap: "0.8rem !important",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {!thumbnails.length ? (
        <ImageListItem sx={ImageListItemStyle}>
          <NoItemCard variant="image" />
        </ImageListItem>
      ) : (
        thumbnails.map((item, i) => (
          <ImageListItem key={item.src} sx={ImageListItemStyle}>
            {item.src ? (
              <Link
                href={link + `/media?media=${i + 1}`}
                style={{ width: 75, height: 75, position: "relative" }}
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt ?? "image " + i + 1}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            ) : (
              <NoItemCard variant="image" />
            )}
          </ImageListItem>
        ))
      )}

      {additional ? (
        <ImageListItem sx={ImageListItemStyle}>
          <Link
            href={link + "/media?media=1"}
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
