import Image from "next/image";
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

        <Box component="section" width={640} height={540} position="relative">
          <Image
            src="/hero.gif"
            alt="hero"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Stack>

      <Button variant="contained" component={NextLink} href="/properties">
        View Properites
      </Button>
    </Box>
  );
}
