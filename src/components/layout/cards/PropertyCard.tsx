import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { PropertyListing } from "@/types";

type PropertyCardProps = {
  propertyData: PropertyListing;
  children?: React.ReactNode;
};

const PropertyCard = ({ propertyData, children }: PropertyCardProps) => {
  return (
    <Container maxWidth="xs">
      <Card elevation={2}>
        <CardHeader
          avatar
          title={
            <Typography variant="h2" fontSize={22} fontWeight={400}>
              {propertyData.name}
            </Typography>
          }
        />
        <CardMedia>{children}</CardMedia>
        <CardContent></CardContent>
      </Card>
    </Container>
  );
};

export default PropertyCard;
