import { Suspense } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";

import NotFound from "@/app/not-found";
import PropertyCards from "@/components/layout/cards/PropertyCards";
import SearchController from "@/components/ui/search/SearchController";

import { Filters } from "@/server/search/filterSearch";
import { validateSearchQuery } from "@/server/search/validateSearchQuery";
import { customTheme } from "@/styles/custom";

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

  const hasFilters = filters.length && isValid ? true : false;

  return filters && !isValid ? (
    <NotFound />
  ) : (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          padding: 2,
          backgroundColor: customTheme.backgroundColor.search.filtersBar,
        }}
      >
        <Card elevation={4}>
          <SearchController queryParams={isValid ? searchParams : null} />
        </Card>
      </Container>

      <Container
        component="main"
        maxWidth="xl"
        sx={{
          flex: "auto",
          justifyContent: "center",
          padding: "32px 16px 96px",
          backgroundColor: customTheme.backgroundColor.search.main,
        }}
      >
        <Grid container component="section" spacing={2} padding={0} margin={0}>
          <Suspense fallback={<p>Loading...</p>}>
            <PropertyCards search={hasFilters ? { searchParams } : null} />
          </Suspense>
        </Grid>
      </Container>
    </>
  );
}
