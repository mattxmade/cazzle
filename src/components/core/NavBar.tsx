import Link from "next/link";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { content } from "@/app/content";
import AccountMenu from "../ui/AccountMenu";
import { requireAuthentication } from "@/server/permissions";

type NavBarProps = {
  navItems?: { name: string; slug: string }[];
};

const NavBar = ({ navItems }: NavBarProps) => {
  const items = navItems ?? content.navBarItems;

  return (
    <Stack component="nav" direction={"row"} spacing={7} alignItems="center">
      <Stack direction={"row"} spacing={3}>
        {items
          ? items.map((item) => (
              <Link
                key={item.name}
                href={item.slug}
                aria-label={`${item.name} page link`}
                style={{ color: "navy", textDecoration: "none" }}
              >
                <Typography
                  variant="button"
                  sx={{ ":hover": { textDecoration: "underline" } }}
                >
                  {item.name}
                </Typography>
              </Link>
            ))
          : null}
      </Stack>

      {!requireAuthentication() ? null : (
        <Stack spacing={1}>
          <ClerkLoading>
            <SignedIn>
              <IconButton
                aria-disabled="true"
                sx={{
                  ":hover": { cursor: "auto", backgroundColor: "inherit" },
                }}
              >
                <CircularProgress size={25} />
              </IconButton>
            </SignedIn>

            <SignedOut>
              <Button
                aria-disabled="true"
                sx={{
                  ":hover": { cursor: "auto", backgroundColor: "inherit" },
                }}
              >
                <CircularProgress size={25} />
              </Button>
            </SignedOut>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <SignOutButton>
                <AccountMenu />
              </SignOutButton>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button aria-label="sign-in">
                  <Typography variant="button">Sign In</Typography>
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
