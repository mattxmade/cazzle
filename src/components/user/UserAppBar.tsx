import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FavouritesModal from "./FavouritesModal";

const UserAppBar = () => {
  const selectOptions = ["default"];

  return (
    <AppBar
      elevation={6}
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        color: "#240046",
        backgroundColor: "inherit",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          gap: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          padding: 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "hsl(0 0% 100%/.2)",
        }}
      >
        <Typography variant="h2" fontSize={28}>
          Favourites
        </Typography>
        <Stack
          gap={4}
          flex="auto"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack justifySelf="flex-start">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>Favourite List</InputLabel>

              <Select value={"default"} autoWidth label="Favourite List">
                {selectOptions.map((listOption) => (
                  <MenuItem key={"location_" + listOption} value={listOption}>
                    {listOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            gap={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              minWidth: "72.5px",
            }}
          >
            <Card
              elevation={4}
              sx={{
                width: "fit-content",

                borderRadius: "100%",
              }}
            >
              <FavouritesModal>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </FavouritesModal>
            </Card>
            <Typography variant="button">New List</Typography>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default UserAppBar;
