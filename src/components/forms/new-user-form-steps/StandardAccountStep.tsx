"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { content } from "@/app/content";

const StandardAccountStep = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Stack component="section" spacing={3}>
      <Card
        elevation={4}
        sx={{
          padding: 4,
          marginLeft: 2,
          backdropFilter: "blur(2px)",
          backgroundColor: "hsl(0 0% 100%/.6)",
        }}
      >
        <Stack component="form" spacing={1}>
          <Typography variant="h2" fontWeight={500} fontSize={24}>
            {content.forms.account.standard.title}
          </Typography>

          <Typography variant="body1" width={"min(100%, 55ch)"}>
            {content.forms.account.standard.description}
          </Typography>

          <Typography variant="body1">
            Look for the{" "}
            <Card
              sx={{
                top: 8,
                px: 1,
                width: "fit-content",
                height: 34,
                position: "relative",
                display: "inline-block",
              }}
            >
              {
                <FavoriteBorderIcon
                  aria-label="favourite icon"
                  role="presentation"
                  sx={{ top: 5, position: "relative" }}
                />
              }{" "}
            </Card>{" "}
            next to each listing.
          </Typography>

          <Typography variant="body1">
            {content.forms.account.standard.instruction}
          </Typography>
        </Stack>
      </Card>

      <Typography variant="subtitle2" paddingLeft={1}>
        {content.forms.account.standard.note}
      </Typography>

      <ButtonGroup>{children}</ButtonGroup>
    </Stack>
  );
};

export default StandardAccountStep;
