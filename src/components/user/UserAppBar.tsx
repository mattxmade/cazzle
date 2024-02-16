import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import AddIcon from "@mui/icons-material/Add";
import IconBuuton from "@mui/material/IconButton";

import { customTheme } from "@/styles/custom";

const UserAppBar = () => {
  return (
    <AppBar
      elevation={6}
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        padding: 1,
        backgroundColor: customTheme.backgroundColor.search.filtersBar,
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between">
          <h2>Your favourites</h2>

          <Stack>Icons Stack</Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default UserAppBar;
