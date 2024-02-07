import { Suspense } from "react";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";

import NotFound from "@/app/not-found";
import PropertyCards from "@/components/layout/cards/PropertyCards";
import SearchFiltersBar from "@/components/ui/search/SearchFiltersBar";
import { validateSearchQuery } from "@/server/validation/validateSearchQuery";

export type ValidParam =
  | "location"
  | "minPrice"
  | "maxPrice"
  | "minBeds"
  | "maxBeds"
  | "propertyType";

export type Filters = {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minBeds?: string;
  maxBeds?: string;
  propertyType?: string;
};

type SearchParams = {
  // no params as non-dynamic route segment
  searchParams: Filters;
};

// fresh data on every request
export const dynamic = "force-dynamic";

export default async function PropertiesPage({ searchParams }: SearchParams) {
  const filters = Object.entries(searchParams);

  // query: key [0] | value [1]
  const isValid =
    filters &&
    filters.every((query) => validateSearchQuery(query[0], query[1]));

  return filters && !isValid ? (
    <NotFound />
  ) : (
    <>
      <Container disableGutters maxWidth={false}>
        <SearchFiltersBar queryParams={isValid ? searchParams : null} />
      </Container>

      <Container
        component="main"
        maxWidth="xl"
        sx={{ justifyContent: "center", backgroundColor: "#e9e9eb" }}
      >
        <Grid container component="section" spacing={2} padding={0} margin={0}>
          <Suspense fallback={<p>Loading...</p>}>
            <PropertyCards search={isValid ? { searchParams } : null} />
          </Suspense>
        </Grid>
      </Container>
    </>
  );
}
