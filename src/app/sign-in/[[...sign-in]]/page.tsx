import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import theme from "@/theme";

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
  if (searchParams.redirect_url) redirect("/sign-in");

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundColor: backgroundColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SignIn />
        </Box>
      </Grid>
    </Grid>
  );
}
