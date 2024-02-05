import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { content } from "@/app/content";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <Container disableGutters maxWidth={false}>
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
          <Typography variant="h3">{content.header.heading}</Typography>
        </Stack>

        {children}
      </Container>
    </Container>
  );
};

export default Header;
