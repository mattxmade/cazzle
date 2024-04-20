import Image from "next/image";
import NextLink from "next/link";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PageTemplate from "@/components/pages/PageTemplate";

export default function NotFound() {
  return (
    <PageTemplate>
      <Stack alignItems="center" gap={4}>
        <Box width={"100%"} height={420} sx={{ position: "relative" }}>
          <Image
            fill
            priority
            alt="404 - page not found"
            src="/not-found.svg"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Stack alignItems="center" gap={2}>
          <Stack alignItems="center">
            <Typography variant="h1" fontSize={36}>
              Page Not Found
            </Typography>
            <Typography>Could not find requested resource</Typography>
          </Stack>

          <Button variant="outlined" href="/" LinkComponent={NextLink}>
            Return Home
          </Button>
        </Stack>
      </Stack>
    </PageTemplate>
  );
}
