import "server-only";
import { Suspense } from "react";

import { api } from "@/../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Typography from "@mui/material/Typography";

import type { PropertyListing_ } from "@/types";
import { type Filters, filterProperties } from "@/server/search/filterSearch";

import CardSkeleton from "./CardSkeleton";
import PropertyCard from "./PropertyCard";
import getSignedInUser from "@/server/user/getUser";

type PropertyCardsProps = {
  search: { searchParams: Filters } | null;
};

const PropertyCards = async ({ search }: PropertyCardsProps) => {
  const propertyListings = (await fetchQuery(
    api.properties.queries.get
  )) as PropertyListing_[];

  const filteredProperties =
    search?.searchParams && propertyListings
      ? await filterProperties(search.searchParams, propertyListings)
      : null;

  const properties = filteredProperties || propertyListings;

  const user = await getSignedInUser();
  const userFavourites = !user ? [] : user.current?.favourites ?? [];

  return !properties.length ? (
    <Typography>No listings found</Typography>
  ) : (
    properties.map((property) => (
      <Suspense key={property._id} fallback={<CardSkeleton />}>
        <PropertyCard
          propertyData={property}
          isUserFavourite={userFavourites.includes(property._id)}
        />
      </Suspense>
    ))
  );
};

export default PropertyCards;
