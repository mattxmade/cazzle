import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import NavBar from "./NavBar";

type HeaderProps = {
  heading?: string;
  subheading?: string;
  logo?: string;
};

const Header = ({ heading, subheading, logo }: HeaderProps) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ backgroundColor: "lightcyan" }}
    >
      <Container
        component="header"
        maxWidth="lg"
        sx={{
          display: "flex",
          paddingTop: 2,
          paddingBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Typography variant="h3">{heading}</Typography>
        </Stack>

        <NavBar />
      </Container>
    </Container>
  );
};

export default Header;
