import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { ListingData } from "@/types";

type ListingMain = {
  listing: ListingData;
};

const ListingMain = ({ listing }: ListingMain) => {
  return <Grid container xs={12} sm={12} md={8}></Grid>;
};

export default ListingMain;
