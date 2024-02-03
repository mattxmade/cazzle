import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  heading?: string;
  subheading?: string;
  logo?: string;
  children?: React.ReactNode;
};

const Header = ({ heading, subheading, logo, children }: HeaderProps) => {
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

        {children}
      </Container>
    </Container>
  );
};

export default Header;
