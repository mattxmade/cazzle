import NextLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { content } from "./content";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        gap: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Box component="section" marginTop={4}>
          <Typography
            variant="h1"
            sx={{ width: "10ch", fontSize: "min(88px, 10vw)" }}
          >
            {content.hero.heading}
          </Typography>
        </Box>

        <Box component="section" sx={{ maxWidth: 640, maxHeight: 540 }}>
          <video
            loop
            muted
            autoPlay
            width={"100%"}
            height={"auto"}
            poster="/hero.jpg"
          >
            <source src="/hero.webm" type="video/webm" />
          </video>
        </Box>
      </Stack>

      <Button variant="contained" component={NextLink} href="/properties">
        View Properites
      </Button>
    </Box>
  );
}
