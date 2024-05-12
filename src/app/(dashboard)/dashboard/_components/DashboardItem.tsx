import Link from "next/link";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ViewQuiltTwoToneIcon from "@mui/icons-material/ViewQuiltTwoTone";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";

import { PropertyListing_ } from "@/types";
import formatPrice from "@/utils/formatPrice";

type DashboardItem = {
  item: PropertyListing_;
  children?: React.ReactNode;
};

const DashboardItem = ({ item, children }: DashboardItem) => {
  const propertyData = item;

  return (
    <Paper sx={{ height: "fit-content" }}>
      <Grid
        container
        spacing={1}
        justifyContent={"space-between"}
        sx={{ placeItems: "center", padding: "0.5rem 1rem" }}
      >
        <Grid xs={3} display="grid" sx={{ placeItems: "center" }}>
          <Typography fontSize={15} variant="h6">
            {propertyData.displayAddress}
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={2} display="grid" sx={{ placeItems: "center" }}>
          <Typography fontSize={14} variant="body1" width="fit-content">
            Feb 03 2024
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={1} display="grid" sx={{ placeItems: "center" }}>
          <Stack width="fit-content">
            <Stack direction="row" spacing={1} sx={{ placeItems: "center" }}>
              {propertyData.galleryImages.length >= 3 ? (
                <CheckIcon sx={{ color: "green", fontSize: 20 }} />
              ) : (
                <ErrorOutlineOutlinedIcon
                  sx={{ color: "#b37415", fontSize: 20 }}
                />
              )}
              <CameraAltIcon
                className="db-icon"
                sx={{
                  fontSize: 25,
                }}
              />
            </Stack>

            <Stack direction="row" spacing={1} sx={{ placeItems: "center" }}>
              {propertyData.floorplanImages.length ? (
                <CheckIcon sx={{ color: "green", fontSize: 20 }} />
              ) : (
                <ErrorOutlineOutlinedIcon
                  sx={{ color: "#b37415", fontSize: 20 }}
                />
              )}
              <ViewQuiltTwoToneIcon
                className="db-icon"
                sx={{
                  fontSize: 25,
                }}
              />
            </Stack>

            <Stack direction="row" spacing={1} sx={{ placeItems: "center" }}>
              {propertyData.forSale ? (
                <CheckIcon sx={{ color: "green", fontSize: 20 }} />
              ) : (
                <ErrorOutlineOutlinedIcon
                  sx={{ color: "#b37415", fontSize: 20 }}
                />
              )}
              <UpdateIcon
                className="db-icon"
                sx={{
                  fontSize: 25,
                }}
              />
            </Stack>
          </Stack>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={2} display="grid" sx={{ placeItems: "center" }}>
          <Typography fontSize={14} variant="body1" width="fit-content">
            {propertyData.slug ? (
              <Link href={`properties/${propertyData.slug}`}>View Listing</Link>
            ) : (
              "-"
            )}
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={1} display="grid" sx={{ placeItems: "center" }}>
          <Typography fontSize={15} variant="subtitle1" width="fit-content">
            {propertyData.forSale ? "Live" : "Unlisted"}
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={1} display="grid" sx={{ placeItems: "center" }}>
          <Typography fontSize={14} variant="body1" width="fit-content">
            {formatPrice(propertyData.fullMarketPrice, "GBP")}
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid xs={1} display="grid" sx={{ placeItems: "center" }}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardItem;
