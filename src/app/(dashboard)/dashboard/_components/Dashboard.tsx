"use client";

import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import Divider from "@mui/material/Divider";

import MenuItems from "./MenuItems";
import MenuDrawer from "./MenuDrawer";
import DashboardAppBar from "./DashboardAppBar";

const menuDrawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleMenuItem = useCallback(() => {}, []);

  return (
    <Box>
      <ElevationScroll>
        <DashboardAppBar
          title="Dashboard"
          open={open}
          drawerWidth={menuDrawerWidth}
          handleDrawerOpen={handleDrawerOpen}
        />
      </ElevationScroll>
      <MenuDrawer
        open={open}
        drawerWidth={menuDrawerWidth}
        handleDrawerClose={handleDrawerClose}
      >
        <Divider />

        <MenuItems />

        <Divider />
      </MenuDrawer>

      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <AdaptiveBox
          reduce={open}
          width={menuDrawerWidth}
          margin={65}
          sx={{
            marginTop: 9,
            marginBottom: 2,
          }}
        ></AdaptiveBox>
      </Box>
    </Box>
  );
};

export default Dashboard;
