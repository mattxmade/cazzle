import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";

const CardSkeleton = () => {
  return (
    <Grid
      xs={12}
      sm={12}
      md={6}
      lg={3}
      xl={3}
      component="article"
      margin={0}
      sx={{ position: "relative" }}
    >
      <Card elevation={2}>
        <CardMedia>
          <Skeleton
            sx={{ height: 222 }}
            animation="wave"
            variant="rectangular"
          />
        </CardMedia>

        <CardHeader
          disableTypography
          avatar={
            <Card
              elevation={3}
              sx={{
                padding: 0.5,
                borderRadius: "10%",
                backgroundColor: "inherit",
              }}
            >
              <Skeleton
                animation="wave"
                variant="circular"
                width={48}
                height={48}
              />
            </Card>
          }
          title={
            <Skeleton animation="wave" variant="rectangular" height={28} />
          }
          subheader={
            <Skeleton animation="wave" variant="rectangular" height={26} />
          }
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            background: "linear-gradient(45deg, #5d5cb7, #d1001b94)",
          }}
        />

        <CardContent sx={{ paddingBottom: "8px !important" }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            spacing={2}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"90%"}
              height={32}
            />
          </Stack>

          <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"90%"}
            height={64}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 1 }}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"90%"}
              height={52}
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardSkeleton;
