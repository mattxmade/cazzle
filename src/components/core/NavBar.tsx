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

import AccountMenu from "../ui/AccountMenu";

import { content } from "@/app/content";
import { requireAuthentication } from "@/server/permissions";
import getSignedInUser from "@/server/user/getUser";

type NavBarProps = {
  navItems?: { name: string; slug: string }[];
};

const NavBar = async ({ navItems }: NavBarProps) => {
  const items = navItems ?? content.navBarItems;

  const user = await getSignedInUser();
  const role = user?.current?.role;

  return (
    <Stack component="nav" direction={"row"} spacing={7} alignItems="center">
      <Stack direction={"row"} spacing={3} className="nav-bar__links">
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

      {!requireAuthentication() ? (
        <AccountMenu variant={true} />
      ) : (
        <Stack spacing={1}>
          <ClerkLoading>
            <IconButton
              aria-disabled="true"
              sx={{
                ":hover": { cursor: "auto", backgroundColor: "inherit" },
              }}
            >
              <CircularProgress size={25} />
            </IconButton>
          </ClerkLoading>

          <ClerkLoaded>
            <AccountMenu userName={user?.current?.name} role={role} />
          </ClerkLoaded>
        </Stack>
      )}
    </Stack>
  );
};

export default NavBar;
