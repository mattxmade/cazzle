import AppBar from "@mui/material/AppBar";

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
      <h2>User App Bar</h2>
    </AppBar>
  );
};

export default UserAppBar;
