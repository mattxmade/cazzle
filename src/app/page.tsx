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

        <Box
          component="section"
          width={640}
          height={540}
          position="relative"
          overflow="hidden"
        >
          <video
            loop
            muted
            autoPlay
            controls
            width={640}
            height={640}
            poster="/hero.jpg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </Box>
      </Stack>

      <Button variant="contained" component={NextLink} href="/properties">
        View Properites
      </Button>
    </Box>
  );
}
