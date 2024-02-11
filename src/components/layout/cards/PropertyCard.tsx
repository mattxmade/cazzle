import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";

import Link from "next/link";
import { Suspense } from "react";

import CardIcons from "./CardIcons";
import PropertyCardMedia from "./PropertyCardMedia";
import FavButton from "@/components/ui/buttons/FavButton";
import formatPrice from "@/utils/formatPrice";
import type { PropertyListing_ } from "@/types";

type PropertyCardProps = {
  propertyData: PropertyListing_;
  children?: React.ReactNode;
};

const PropertyCard = async ({ propertyData, children }: PropertyCardProps) => {
  const LinkProps = {
    href: `/properties/${propertyData.slug}`,
    style: {
      color: "black",
      textDecoration: "none",
    } as React.CSSProperties,
  };

  const css: React.CSSProperties = {
    color: "ivory",
  };

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
        <Link {...LinkProps}>
          <CardMedia>
            <Suspense fallback={<p>Loading...</p>}>
              <PropertyCardMedia galleryImages={propertyData.galleryImages} />
            </Suspense>
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
                <Avatar>
                  <Typography>C</Typography>
                </Avatar>
              </Card>
            }
            title={
              <Typography
                variant="h2"
                fontSize={22}
                fontWeight={500}
                sx={{ ...css }}
              >
                {propertyData.street}
              </Typography>
            }
            subheader={
              <Typography variant="body2" fontSize={18} sx={{ ...css }}>
                {formatPrice(propertyData.fullMarketPrice, "GBP")}
              </Typography>
            }
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              background: "linear-gradient(45deg, #5d5cb7, #d1001b94)",
            }}
          />
        </Link>

        <CardContent sx={{ paddingBottom: "8px !important" }}>
          <Link {...LinkProps}>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography variant="body2" fontSize={16} fontWeight={500}>
                {propertyData.propertyType.group}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Card>
                  <Stack direction="row" spacing={0.75} padding={0.5}>
                    <HotelOutlinedIcon />
                    <Typography variant="body2" fontSize={16}>
                      {propertyData.bedrooms}
                    </Typography>
                  </Stack>
                </Card>
                <Card>
                  <Stack direction="row" spacing={0.75} padding={0.5}>
                    <ShowerOutlinedIcon />
                    <Typography variant="body2" fontSize={16}>
                      {propertyData.bathrooms}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </Link>

          <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

          <Link {...LinkProps}>
            <Typography variant="subtitle2">{propertyData.summary}</Typography>
          </Link>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 1 }}
          >
            <Card
              sx={{
                width: "fit-content",
                padding: 0.5,
                backgroundColor: "darkslategrey",
              }}
            >
              <Link href={LinkProps.href} style={{ textDecoration: "none" }}>
                <CardIcons
                  color={css.color}
                  imageIndex={1}
                  videoCount={0}
                  imageCount={propertyData.galleryImages.length}
                  floorplanCount={propertyData.floorplanImages.length}
                />
              </Link>
            </Card>
            <FavButton listingId={propertyData._id} />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PropertyCard;
