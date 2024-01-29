import Link from "@mui/material/Link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type ThumbnailsProps = {
  thumbnails: { src: string; alt: string; type: string }[];
};

const Thumbnails = ({ thumbnails }: ThumbnailsProps) => (
  <ImageList>
    {thumbnails.map((item) => (
      <ImageListItem key={item.src}>
        <Link>
          <img srcSet={item.src} alt={item.alt} loading="lazy" />
        </Link>
      </ImageListItem>
    ))}
  </ImageList>
);

export default Thumbnails;
