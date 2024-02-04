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
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { content } from "@/app/content";

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
                style={{ textDecoration: "none" }}
              >
                <Typography variant="button">{item.name}</Typography>
              </Link>
            ))
          : null}
      </Stack>

      <Stack spacing={1}>
        <ClerkLoading>
          <Button>
            <CircularProgress size={25} />
          </Button>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <SignOutButton>
              <Button>
                <Typography variant="button">Sign Out</Typography>
              </Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>
                <Typography variant="button">Sign In</Typography>
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </Stack>
    </Stack>
  );
};

export default NavBar;
