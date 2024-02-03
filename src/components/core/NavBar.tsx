import Link from "next/link";

import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type NavBarProps = {
  navItems: { name: string; slug: string }[];
};

const NavBar = ({ navItems }: NavBarProps) => {
  return (
    <Stack component="nav" direction={"row"} spacing={7} alignItems="center">
      <Stack direction={"row"} spacing={3}>
        {navItems.map((item) => (
          <Link href={item.slug} style={{ textDecoration: "none" }}>
            <Typography variant="button">{item.name}</Typography>
          </Link>
        ))}
      </Stack>

      <Stack spacing={1}>
        <SignedIn>
          <SignOutButton>
            <Button>
              <Typography variant="button">Sign Out</Typography>
            </Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>
              <Typography variant="button">Sign In</Typography>
            </Button>
          </SignInButton>
        </SignedOut>
      </Stack>
    </Stack>
  );
};

export default NavBar;
