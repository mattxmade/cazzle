import Link from "@mui/material/Link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type ThumbnailsProps = {
  additional: number | null;
  thumbnails: { src: string; alt: string; type: string }[];
};

const ImageListItemStyle = {
  width: 75,
  height: 75,
  display: "grid",
  overflow: "hidden",
  borderRadius: "0.2rem",
  backgroundColor: "lavender",
  ":hover": { cursor: "pointer" },
};

const Thumbnails = ({ additional, thumbnails }: ThumbnailsProps) => (
  <ImageList
    sx={{ gap: "0.8rem !important", display: "flex", flexWrap: "wrap" }}
  >
    {thumbnails.map((item) => (
      <ImageListItem key={item.src} sx={ImageListItemStyle}>
        <Link width={75} height={75} display="grid" justifyContent="center">
          <img
            srcSet={`${item.src}?h=75&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.src}?h=75&fit=crop&auto=format`}
            alt={item.alt}
            loading="lazy"
          />
        </Link>
      </ImageListItem>
    ))}

    {additional ? (
      <ImageListItem sx={ImageListItemStyle}>
        <Link
          alignSelf="center"
          justifySelf="center"
          sx={{ fontSize: "1.4rem", textDecoration: "none" }}
        >
          +{additional}
        </Link>
      </ImageListItem>
    ) : null}
  </ImageList>
);

export default Thumbnails;
