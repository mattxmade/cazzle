import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { PropertyListing } from "@/types";
import Link from "next/link";
import CardIcons from "./CardIcons";
import React from "react";

type PropertyCardProps = {
  propertyData: PropertyListing;
  children?: React.ReactNode;
};

const PropertyCard = ({ propertyData, children }: PropertyCardProps) => {
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
      md={5.8}
      lg={3.8}
      xl={2.8}
      component="article"
      margin={0}
      sx={{ position: "relative" }}
    >
      <Card elevation={2}>
        <Link {...LinkProps}>
          <CardMedia>{children}</CardMedia>

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
                {propertyData.name}
              </Typography>
            }
            subheader={
              <Typography variant="body2" fontSize={18} sx={{ ...css }}>
                £{propertyData.fullMarketPrice}
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
              <Link href={LinkProps.href}>
                <CardIcons
                  color={css.color}
                  imageIndex={1}
                  videoCount={0}
                  imageCount={propertyData.galleryImages.length}
                  floorplanCount={propertyData.floorplanImages.length}
                />
              </Link>
            </Card>

            <Stack direction="row" alignItems="center">
              <Button
                aria-label="favourite property"
                sx={{
                  minWidth: 0,
                  minHeight: 0,
                  padding: 0.75,
                  borderRadius: "100%",
                }}
              >
                <Card sx={{ lineHeight: 0, padding: 1, borderRadius: "100%" }}>
                  <FavoriteBorderOutlinedIcon />
                </Card>
              </Button>
              <Typography variant="body1" fontWeight={500}>
                Save
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PropertyCard;
