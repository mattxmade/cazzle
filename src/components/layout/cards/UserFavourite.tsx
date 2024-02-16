import "server-only";

import { api } from "@/../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Id } from "@/../convex/_generated/dataModel";

import { Suspense } from "react";
import Typography from "@mui/material/Typography";

import PropertyCard from "./PropertyCard";
import type { PropertyListing_ } from "@/types";

type UserFavouritesProps = {
  token: string;
  listingId: Id<"properties">;
};

const UserFavourite = async (props: UserFavouritesProps) => {
  const { getUserFavourite } = api.users.queries;

  const args = { listing_id: props.listingId };
  const options = { token: props.token };

  const listingItem = (await fetchQuery(
    getUserFavourite,
    args,
    options
  )) as PropertyListing_;

  return listingItem ? (
    <PropertyCard propertyData={listingItem} isUserFavourite={true} />
  ) : (
    <Typography>Listing no longer available</Typography>
  );
};

export default UserFavourite;
