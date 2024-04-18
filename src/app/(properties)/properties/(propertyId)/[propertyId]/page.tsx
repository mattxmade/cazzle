import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack/Stack";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import CalculateIcon from "@mui/icons-material/CalculateOutlined";

import NotFound from "@/app/not-found";
import ImageGrid from "@/components/layout/ImageGrid";
import PrimaryGrid from "@/components/layout/PrimaryGrid";
import Thumbnails from "@/components/Thumbnails";
import NoItemCard from "@/components/NoItemCard";
import BranchCard from "@/components/layout/cards/BranchCard";
import InfoTooltip from "@/components/ui/feedback/InfoTooltip";
import ListingAside from "@/components/listing/ListingAside";
import ListingHeader from "@/components/listing/ListingHeader";
import ListingDetails from "@/components/listing/ListingDetails";

import { content } from "@/app/content";
import formatPrice from "@/utils/formatPrice";
import type { PropertyListing_ } from "@/types";

type PropertyPageParams = Readonly<{
  params: { propertyId: string };
}>;

export const dynamic = "force-dynamic";

export default async function PropertyPage({ params }: PropertyPageParams) {
  const property = (await fetchQuery(api.properties.queries.getPropertyBySlug, {
    name: params.propertyId,
  })) as PropertyListing_;

  if (!property) return <NotFound />;

  const dbImages = await fetchQuery(api.properties.queries.getPropertyImages, {
    ImageIdList: property.galleryImages as { storageId: Id<"_storage"> }[],
  });

  const images = dbImages
    ? dbImages.filter((img) => typeof img.src === "string" && img)
    : [];

  const features = property.features;

  const sectionStyle = {
    disableGutters: true,
    component: "section",
    sx: { paddingTop: 2, paddingBottom: 2 },
  };

  return (
    <Container
      disableGutters
      component="main"
      maxWidth="lg"
      sx={{ display: "grid", padding: "4rem 1rem" }}
    >
      <ImageGrid link={property.slug + "/media?media="} imageData={images} />

      <PrimaryGrid
        mediumAboveDisplayElements={
          <Grid container md={4} sx={{ paddingTop: 2 }}>
            {/* Listing Aside */}
            <ListingAside>
              <BranchCard sticky details={{ name: content.project.name }} />
            </ListingAside>
          </Grid>
        }
      >
        {/* Listing Main Content */}
        <Grid container xs={12} sm={12} md={8} width="100%">
          <Stack width="100%">
            <Container {...sectionStyle}>
              <ListingHeader heading={property.displayAddress} />

              <Stack gap={1} direction="row" alignItems="center">
                <Typography variant="h4">
                  {formatPrice(property.fullMarketPrice, "GBP")}
                </Typography>

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
                <NoItemCard variant="floorplan" />
              ) : (
                <></>
              )}

              <Thumbnails
                link={"/properties/" + property.slug}
                images={images}
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
                <Grid xs={2} sm={2} md={2} lg={1} gap={2}>
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
                    {property.environmentRating ?? "Not provided"}
                  </Typography>
                </Grid>

                <Grid xs={2} sm={2} md={2} lg={1} gap={2}>
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
