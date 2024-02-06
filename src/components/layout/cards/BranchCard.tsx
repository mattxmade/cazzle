import NextLink from "next/link";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

type BranchCardProps = {
  sticky?: boolean;
  details: { name: string };
};

const buttonStyle = {
  color: "black",
  padding: 2,
  backgroundColor: "rgba(0, 222, 182, 0.9)",
  ":hover": {
    backgroundColor: "rgb(0, 222, 182)",
  },
};

const BranchCard = (props: BranchCardProps) => {
  return (
    <Container disableGutters sx={{ width: 390, paddingLeft: 3 }}>
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

      <Stack
        spacing={1}
        sx={{ padding: 3, borderRadius: 1, background: "#000433" }}
      >
        <Button
          variant="outlined"
          sx={buttonStyle}
          aria-disabled={true}
          aria-label="call agent"
          startIcon={<LocalPhoneRoundedIcon />}
        >
          Call agent
        </Button>

        <Button
          variant="outlined"
          sx={buttonStyle}
          aria-disabled={true}
          aria-label="request details"
          startIcon={<MailOutlineRoundedIcon />}
        >
          Request Details
        </Button>
      </Stack>
    </Container>
  );
};

export default BranchCard;
