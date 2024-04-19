import { Fragment } from "react";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Header from "@/components/core/Header";
import NavBar from "@/components/core/NavBar";

import createAccount from "@/server/user/createAccount";
import getSignedInUser from "@/server/user/getUser";
import { checkPermission } from "@/server/permissions";

const flexLayout: React.CSSProperties = {
  flex: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default async function OnboardingPage() {
  checkPermission();

  const user = await getSignedInUser();
  if (!user) redirect("/sign-in");

  if (user.current?.role === "user") redirect("/properties");
  if (user.current?.role === "estate-agent") redirect("/dashboard");

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const formData = new FormData();
  formData.append("accountName", clerkUser.firstName ?? "user");
  formData.append("accountType", "standard");

  const accountSetupResponse = await createAccount(formData);
  if (!accountSetupResponse) redirect("/sign-in");

  return (
    <Fragment>
      <Header>
        <NavBar />
      </Header>

      <Container
        disableGutters
        component="main"
        maxWidth={false}
        sx={{
          ...flexLayout,
          flex: "auto",
          backgroundColor: "#e9e9eb",
        }}
      >
        <Container component="section" maxWidth="xl" sx={{ ...flexLayout }}>
          <Stack
            gap={6}
            flex="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2">{accountSetupResponse.message}</Typography>

            <Typography variant="button">
              Look for the{" "}
              {
                <FavoriteBorderIcon
                  aria-label="favourite icon"
                  role="presentation"
                  sx={{ top: 5, position: "relative" }}
                />
              }{" "}
              next to each listing to add them to your favourites.
            </Typography>

            <Button variant="contained" component={NextLink} href="/properties">
              View Properites
            </Button>
          </Stack>
        </Container>
      </Container>
    </Fragment>
  );
}
