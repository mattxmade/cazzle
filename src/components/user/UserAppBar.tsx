import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
      <Container
        maxWidth="xl"
        sx={{
          gap: 24,
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <h2>Your favourites</h2>
        <Stack
          flex="auto"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack justifySelf="flex-start">
            <Typography>List</Typography>
          </Stack>

          <Stack gap={1} alignItems="center" justifyContent="center">
            <Card
              elevation={4}
              sx={{ width: "fit-content", borderRadius: "100%" }}
            >
              <IconButton>
                <AddIcon />
              </IconButton>
            </Card>
            <Typography variant="button">New List</Typography>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default UserAppBar;
