"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { useState } from "react";

type DashboardAppBarProps = {
  open?: boolean;
  title: string;
  handleDrawerOpen: () => void;
};

const DashboardAppBar = (props: DashboardAppBarProps) => {
  const { open, title, handleDrawerOpen } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" open={open} drawerWidth={240}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="dashboard menu"
            sx={{ marginRight: 2, ...(open && { display: "none" }) }}
            onClick={handleDrawerOpen}
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

type AppBarProps = {
  drawerWidth: number;
  open?: boolean;
} & MuiAppBarProps;

// https://mui.com/material-ui/react-drawer/#mini-variant-drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
