import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type DashboardAppBarProps = {
  title: string;
};

const DashboardAppBar = ({ title }: DashboardAppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="dashboard menu"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button color="inherit" aria-label="sign in">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardAppBar;
