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
  thumbnails: { src: string; alt: string; type: string }[];
};

const Thumbnails = ({ slug, additional, thumbnails }: ThumbnailsProps) => (
  <ImageList
    sx={{ gap: "0.8rem !important", display: "flex", flexWrap: "wrap" }}
  >
    {thumbnails.map((item, i) => (
      <ImageListItem key={item.src} sx={ImageListItemStyle}>
        <Link href={slug + `?id=media${i}`} style={{ width: 75, height: 75 }}>
          <Image
            fill
            src={item.src}
            alt={item.alt}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </ImageListItem>
    ))}

    {additional ? (
      <ImageListItem sx={ImageListItemStyle}>
        <Link
          href={slug}
          style={{
            display: "grid",
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

export default Thumbnails;
