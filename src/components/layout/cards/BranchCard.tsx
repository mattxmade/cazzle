import NextLink from "next/link";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type BranchCardProps = {
  sticky?: boolean;
  details: { name: string };
};

const BranchCard = (props: BranchCardProps) => {
  return (
    <Container disableGutters sx={{ width: "100%", paddingLeft: 2 }}>
      <Card elevation={6} sx={{ gap: 2, display: "grid", padding: 3 }}>
        <CardHeader
          sx={{ flexDirection: "row-reverse" }}
          avatar={
            <Card sx={{ padding: 1 }}>
              <Avatar>{props.details.name.slice(0, 1)}</Avatar>
            </Card>
          }
          title={
            <Stack>
              <Typography variant="caption">MARKETED BY</Typography>
              <Button
                href="/estate-agents/agents/cazzle"
                LinkComponent={NextLink}
                sx={{ width: "fit-content" }}
              >
                <Typography>{props.details.name}</Typography>
              </Button>
            </Stack>
          }
        />
      </Card>
    </Container>
  );
};

export default BranchCard;
