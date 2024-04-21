"use client";

import { Fragment, Suspense } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { content } from "@/app/content";
import { isIgnoredPath } from "@/server/routePath";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  if (isIgnoredPath(usePathname())) return <Fragment />;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        top: 0,
        zIndex: 100,
        position: "sticky",
        backdropFilter: "blur(8px)",
        background: "rgb(255 255 255 / 60%)",
      }}
    >
      <Container
        component="header"
        maxWidth="lg"
        sx={{
          display: "flex",
          paddingTop: 2,
          paddingBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Link
            href="/"
            aria-label="home page"
            style={{ color: "initial", textDecoration: "none" }}
          >
            <Typography variant="h4">{content.header.heading}</Typography>
          </Link>
        </Stack>
        <div>{children}</div>
      </Container>
      <Divider />
    </Container>
  );
};

export default Header;
