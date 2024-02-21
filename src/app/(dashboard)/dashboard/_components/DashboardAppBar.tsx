"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@/components/mui/app-bar/AppBar";

type DashboardAppBarProps = {
  open?: boolean;
  title: string;
  drawerWidth: 240;
  handleDrawerOpen: () => void;
};

const DashboardAppBar = (props: DashboardAppBarProps) => {
  const { open, title, drawerWidth, handleDrawerOpen } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar open={open} width={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
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
            <SignInButton mode="modal">
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
