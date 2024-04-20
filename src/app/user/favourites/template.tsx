import { Suspense } from "react";
import { redirect } from "next/navigation";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography";

import UserAppBar from "@/components/user/UserAppBar";
import CardSkeleton from "@/components/layout/cards/CardSkeleton";
import UserFavourite from "@/components/layout/cards/UserFavourite";
import PageTemplate from "@/components/pages/PageTemplate";

import getSignedInUser from "@/server/user/getUser";
import { customTheme } from "@/styles/custom";
import { checkPermission } from "@/server/permissions";

type Props = {
  children: React.ReactNode;
};

export default async function RouteTemplate({ children }: Props) {
  checkPermission();

  const user = await getSignedInUser();
  if (!user || user.current?.role === "agent") return redirect("/not-found");

  return (
    <PageTemplate>
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
          {user.current?.favourites?.length ? (
            user.current.favourites.map((listing_id) => (
              <Suspense key={listing_id} fallback={<CardSkeleton />}>
                <UserFavourite token={user.token} listingId={listing_id} />
              </Suspense>
            ))
          ) : (
            <Typography>Favourited properties will be listed here. </Typography>
          )}

          <UserAppBar />
        </Grid>
      </Container>
    </PageTemplate>
  );
}
