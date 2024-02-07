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
  // params: string; // no params as non-dynamic route segment
  searchParams: Filters;
};

let count = 0;

// cached data otherwise
// export const dynamic = "force-dynamic";

export default async function PropertiesPage({ searchParams }: SearchParams) {
  let valid = false;
  const filters = Object.entries(searchParams);

  if (filters.length) {
    valid = filters.every((query) => {
      const isValid = validateSearchQuery(query[0], query[1]);

      console.log("From middleware : " + isValid);

      return isValid;
    });
  }

  count += 1;

  console.log(`++ --- ${count}--- ++`);
  console.log("Filters Count: " + filters.length);
  console.log("Valid Query:" + valid);

  return filters.length && !valid ? (
    <NotFound />
  ) : (
    <>
      <Container disableGutters maxWidth={false}>
        <SearchFiltersBar queryParams={valid ? searchParams : null} />
      </Container>

      <Container
        component="main"
        maxWidth="xl"
        sx={{ justifyContent: "center", backgroundColor: "#e9e9eb" }}
      >
        <Grid container component="section" spacing={2} padding={0} margin={0}>
          <Suspense fallback={<p>Loading...</p>}>
            <PropertyCards search={valid ? { searchParams } : null} />
          </Suspense>
        </Grid>
      </Container>
    </>
  );
}
