import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";

import Image from "next/image";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import HouseSharpIcon from "@mui/icons-material/HouseSharp";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";

// import theme from "@/theme";
// TODO theme.spacing

type PropertyPageParams = {
  params: { propertyId: string };
};

export const dyanmic = "force-dynamic";

export default async function PropertyPage({ params }: PropertyPageParams) {
  const property = await fetchQuery(api.properties.queries.getProperty, {
    name: params.propertyId,
  });

  return !property ? null : (
    <Box component="main" sx={{ display: "grid", padding: "4rem 2rem" }}>
      <Button sx={{ width: "100%", padding: "0 2rem" }}>
        <Image src="" alt="" height={120} style={{ width: "100%" }} />
      </Button>

      <Grid container spacing={1} width="100%">
        <Grid xs={8}>
          <Button sx={{ width: "100%" }}>
            <Image src="" alt="" height={360} style={{ width: "100%" }} />
          </Button>
        </Grid>
        <Grid xs={4}>
          <TuneSharpIcon sx={{ width: "100%" }} />
        </Grid>
      </Grid>

      <Grid container spacing={2} width="100%">
        <Grid xs={8}>
          <HouseSharpIcon
            sx={{ width: "100%", backgroundColor: "lightgrey" }}
          />
        </Grid>
        <Grid xs={4}>
          <TuneSharpIcon sx={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  );
}
