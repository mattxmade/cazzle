import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemStyle } from "@/styles/custom";

type MediaGalleryProps = {
  mediaData: { src: string; alt: string; type: string }[];
};

const MediaGalleryAside = ({ mediaData }: MediaGalleryProps) => {
  return (
    <Card elevation={3} sx={{ width: "fit-content" }}>
      <ImageList
        gap={12}
        cols={2}
        rowHeight={120}
        sx={{ width: "fit-content" }}
      >
        {mediaData.map((item) => (
          <ImageListItem
            key={item.src}
            sx={{
              width: 160,
              height: "auto",
              backgroundColor: "inherit",
            }}
          >
            <Button>
              <img
                srcSet={`${item.src}?w=180&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.src}?w=180&fit=crop&auto=format`}
                alt={item.alt}
                loading="lazy"
              />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
};

const MediaGallery = ({ mediaData }: MediaGalleryProps) => {
  return (
    <Box component="main" display={"flex"}>
      <Box>
        <MediaGalleryAside mediaData={mediaData} />
      </Box>
      <Container>Gallery Viewer</Container>
    </Box>
  );
};

export default MediaGallery;
