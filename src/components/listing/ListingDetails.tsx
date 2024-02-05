import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function IconBar() {
  return (
    <Grid container spacing={2} width="100%">
      <Grid xs={3} flexGrow={1}>
        <Typography variant="body2">TEXT 1</Typography>
      </Grid>
      <Grid xs={3} flexGrow={1}>
        <Typography variant="body2">TEXT 2</Typography>
      </Grid>
      <Grid xs={3} flexGrow={1}>
        <Typography variant="body2">TEXT 3</Typography>
      </Grid>
      <Grid xs={3} flexGrow={1}>
        <Typography variant="body2">TEXT 4</Typography>
      </Grid>
    </Grid>
  );
}
