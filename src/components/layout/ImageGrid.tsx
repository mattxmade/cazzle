import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

type ImageGrid = {
  imageData: { src: string; alt: string };
  link?: string;
};

const ImageGrid = ({ imageData, link }: ImageGrid) => {
  <Grid container sx={{ height: 435 }}>
    <Grid sm={12} md={8} paddingRight={"4px"}></Grid>
    <Grid container sm={0} md={4} paddingLeft={"4px"}></Grid>
  </Grid>;
};

export default ImageGrid;
