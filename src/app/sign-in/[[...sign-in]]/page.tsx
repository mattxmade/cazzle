import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import theme from "@/theme";
import { checkPermission } from "@/server/permissions";

const backgroundColor = theme.palette?.mode
  ? theme.palette.mode === "light"
    ? theme.palette.grey[50]
    : theme.palette.grey[900]
  : "";

type PageParams = {
  params: string;
  searchParams: { redirect_url?: string };
};

export default function SignInPage({ params, searchParams }: PageParams) {
  checkPermission();

  if (searchParams.redirect_url) redirect("/sign-in");

  return (
    <Grid
      container
      component="main"
      maxWidth={2400}
      sx={{ height: "100vh", alignSelf: "center", overflowX: "hidden" }}
    >
      <Grid
        item
        xs={0}
        sm={0}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: backgroundColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid square item xs={12} sm={12} md={5} component={Paper} elevation={6}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SignIn />
        </Box>
      </Grid>
    </Grid>
  );
}
