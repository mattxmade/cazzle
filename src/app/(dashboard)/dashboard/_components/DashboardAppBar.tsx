"use client";

import { useEffect, useState } from "react";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import AppBar from "@/components/mui/app-bar/AppBar";
import AccountMenu from "@/components/ui/AccountMenu";

type DashboardAppBarProps = {
  open?: boolean;
  title: string;
  drawerWidth: 240;
  children?: React.ReactNode;
  handleDrawerOpen: () => void;
};

const DashboardAppBar = (props: DashboardAppBarProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && document) setLoaded(true);
  }, []);

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

          {!loaded ? (
            <ClerkLoading>
              <IconButton>
                <CircularProgress size={25} sx={{ color: "white" }} />
              </IconButton>
            </ClerkLoading>
          ) : null}

          <Box
            sx={{
              right: 0,
              transition: "0.3s",
              position: "fixed",
              transform: `translate(-80px, ${loaded ? 0 : "-80px"})`,
            }}
          >
            {props.children}
          </Box>

          <SignedIn>
            <ClerkLoaded>
              <AccountMenu />
            </ClerkLoaded>
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
