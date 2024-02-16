import "server-only";

import { api } from "@/../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Id } from "@/../convex/_generated/dataModel";

import { Suspense } from "react";
import Typography from "@mui/material/Typography";

import PropertyCard from "./PropertyCard";
import type { PropertyListing_ } from "@/types";

type UserFavouritesProps = {
  id: Id<"users">;
  token: string;
  userFavourites: Id<"properties">[];
};

const UserFavourites = async (props: UserFavouritesProps) => {
  const { getUserFavourites } = api.users.queries;

  const args = { user_id: props.id, favourites: props.userFavourites };
  const options = { token: props.token };

  const listingItems = (await fetchQuery(
    getUserFavourites,
    args,
    options
  )) as PropertyListing_[];

  return listingItems && listingItems.length ? (
    listingItems.map((listing) => (
      <Suspense key={listing._id}>
        <PropertyCard
          propertyData={listing}
          isUserFavourite={props.userFavourites.includes(listing._id)}
        />
      </Suspense>
    ))
  ) : (
    <Typography>No listings found</Typography>
  );
};

export default UserFavourites;
