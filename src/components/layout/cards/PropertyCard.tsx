import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";

import { PropertyListing } from "@/types";

type PropertyCardProps = {
  propertyData: PropertyListing;
  children?: React.ReactNode;
};

const PropertyCard = ({ propertyData, children }: PropertyCardProps) => {
  const css: React.CSSProperties = {
    color: "ivory",
  };

  return (
    <Container component="article" maxWidth="xs">
      <Card elevation={2}>
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

        <CardContent>
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default PropertyCard;
