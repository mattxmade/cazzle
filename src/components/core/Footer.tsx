"use client";

import { usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";

import Copyright from "../Copyright";

const Footer = () => {
  const pathname = usePathname();
  return (
    <Stack component="footer" padding={pathname === "/" ? 2 : 0}>
      {pathname === "/" ? <Copyright /> : null}
    </Stack>
  );
};

export default Footer;
