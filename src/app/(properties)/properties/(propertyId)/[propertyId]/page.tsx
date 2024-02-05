import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";

import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack/Stack";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import CalculateIcon from "@mui/icons-material/CalculateOutlined";

import ImageBanner from "@/components/ImageBanner";
import ImageGrid from "@/components/layout/ImageGrid";
import PrimaryGrid from "@/components/layout/PrimaryGrid";
import Thumbnails from "@/components/Thumbnails";
import NoItemCard from "@/components/NoItemCard";
import InfoTooltip from "@/components/ui/feedback/InfoTooltip";
import ListingHeader from "@/components/listing/ListingHeader";
import ListingDetails from "@/components/listing/ListingDetails";
import { PropertyListing } from "@/types";

type PropertyPageParams = {
  params: { propertyId: string };
};

export const dyanmic = "force-dynamic";

export default async function PropertyPage({ params }: PropertyPageParams) {
  const property: PropertyListing = await fetchQuery(
    api.properties.queries.getProperty,
    {
      name: params.propertyId,
    }
  );

  const features: string[] = [];

  if (property.features.length) {
    property.features.forEach((feature: any) =>
      feature.values.forEach((item: string) => features.push(item))
    );
  }

  const sectionStyle = {
    disableGutters: true,
    component: "section",
    sx: { paddingTop: 2, paddingBottom: 2 },
  };

  return !property ? null : (
    <Container
      disableGutters
      component="main"
      maxWidth="lg"
      sx={{ display: "grid", padding: "4rem 1rem" }}
    >
      <ImageBanner src="" alt="" slug="/" />
      <ImageGrid link="/media?id=media" imageData={property.galleryImages} />

      <PrimaryGrid
        mediumAboveDisplayElements={
          <Grid container md={4}>
            <TuneSharpIcon sx={{ width: "100%" }} />
          </Grid>
        }
      >
        <Grid container xs={12} sm={12} md={8} width="100%">
          <Stack width="100%">
            <Container {...sectionStyle}>
              <ListingHeader heading={property.displayAddress} />

              <Stack gap={1} direction="row" alignItems="center">
                <Typography variant="h4">{property.fullMarketPrice}</Typography>

                <Button sx={{ minWidth: 0, padding: 0, borderRadius: "100%" }}>
                  <InfoIcon fontSize="small" />
                </Button>
              </Stack>

              <Button sx={{ width: "fit-content", padding: 0 }}>
                <Stack gap={1} direction="row" alignItems="center">
                  <CalculateIcon fontSize="medium" />
                  <Typography variant="body2">
                    Monthly mortgage payments
                  </Typography>
                </Stack>
              </Button>
            </Container>
            <Divider />

            <Container {...sectionStyle}>
              <ListingDetails
                view="page"
                size={0}
                type={property.propertyType.name}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
              />
            </Container>
            <Divider />

            <Container
              {...sectionStyle}
              sx={{ gap: 2, display: "flex", alignItems: "center" }}
            >
              {!property.floorplanImages.length ? (
                <NoItemCard type="floorplan" />
              ) : (
                <></>
              )}

              <Thumbnails
                slug={"/properties/" + property.slug}
                additional={
                  property.galleryImages.length > 6
                    ? property.galleryImages.length - 6
                    : null
                }
                thumbnails={property.galleryImages.filter(
                  (image, i) => i <= 5 && image
                )}
              />
            </Container>
            <Divider />

            <Container {...sectionStyle}>
              <Typography variant="h6" fontWeight="500" marginBottom={1}>
                Features
              </Typography>

              <Grid container columns={2} spacing={1} component="ul">
                {features.map((item, i) => (
                  <Grid
                    key={`feature_${item}_${i}`}
                    xs={1}
                    component="li"
                    sx={{ listStyle: "outside" }}
                  >
                    <Typography key={item + "_" + i}>{item}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Divider />

            <Container {...sectionStyle}>
              <Typography variant="h6" fontWeight="500" marginBottom={1}>
                Description
              </Typography>

              {property.description.length ? (
                <Grid gap={2} container columns={1}>
                  {property.description.map((content: any, i: number) => (
                    <Typography key={content + "_" + i}>{content}</Typography>
                  ))}
                </Grid>
              ) : (
                <Typography>No description provided</Typography>
              )}
            </Container>
            <Divider />

            <Container {...sectionStyle}>
              <Grid container columns={2} spacing={1}>
                <Grid sm={1} gap={2}>
                  <Stack gap={0.5} direction="row" alignItems="center">
                    <Typography variant="h6" fontWeight="500">
                      Energy Performance Certificates
                    </Typography>
                    <InfoTooltip
                      heading=""
                      body="Laborum sint deserunt modi eveniet eos aperiam!"
                    />
                  </Stack>

                  <Typography fontWeight={"500"}>
                    {/* @ts-ignore */}
                    {property.enviro ?? "Not provided"}
                  </Typography>
                </Grid>

                <Grid sm={1} gap={2}>
                  <Stack gap={0.5} direction="row" alignItems="center">
                    <Typography variant="h6" fontWeight="500">
                      Council Tax
                    </Typography>
                    <InfoTooltip
                      heading=""
                      body="Laborum sint deserunt modi eveniet eos aperiam!"
                    />
                  </Stack>

                  <Typography fontWeight={"500"}>
                    {property.councilTaxBand
                      ? "Band: " + property.councilTaxBand
                      : "Not provided"}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Divider />
          </Stack>
        </Grid>
      </PrimaryGrid>
    </Container>
  );
}
