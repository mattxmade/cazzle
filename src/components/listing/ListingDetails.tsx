import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";

import InfoTooltip from "../ui/feedback/InfoTooltip";
import ListingDetail from "./ListingDetail";
import type { PropertyType } from "@/types";

type ListingDetailsProps = {
  view: "page" | "card";
  type: PropertyType["name"];
  bedrooms: number;
  bathrooms: number;
  size?: number;
} & React.ComponentProps<"section">;

const ListingDetails = (props: ListingDetailsProps) => {
  return (
    <Box
      component="section"
      sx={{
        gap: "2rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Grid flexGrow={1}>
        <ListingDetail
          heading={"PROPERTY TYPE"}
          textContent={props.type}
          Icon={HomeOutlinedIcon}
        />
      </Grid>

      <Grid flexGrow={1}>
        <ListingDetail
          heading={"BEDROOMS"}
          textContent={`${props.bedrooms}`}
          Icon={HotelOutlinedIcon}
        />
      </Grid>

      <Grid flexGrow={1}>
        <ListingDetail
          heading={"BATHROOMS"}
          textContent={`${props.bathrooms}`}
          Icon={ShowerOutlinedIcon}
        />
      </Grid>

      <Grid flexGrow={1}>
        <ListingDetail
          heading={"SIZE"}
          textContent={props.size ? props.size + " ft" : "Ask agent"}
          Icon={ViewComfyOutlinedIcon}
        />
      </Grid>

      <Grid flexGrow={1}>
        <Box gap={1} display="flex" alignItems="center">
          <Typography variant="body2">TENURE</Typography>

          <InfoTooltip
            heading="Tenure"
            subheading="Describes how you own a property."
            body="There are different types of tenure - freehold, leasehold, and commonhold. "
            link={{ href: "#", text: "Read more" }}
          />
        </Box>

        <Typography variant="body1" fontWeight="500">
          Freehold
        </Typography>
      </Grid>
    </Box>
  );
};

export default ListingDetails;
