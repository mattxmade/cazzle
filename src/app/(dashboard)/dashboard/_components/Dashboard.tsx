"use client";

import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import MenuDrawer from "./MenuDrawer";
import DashboardAppBar from "./DashboardAppBar";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <Box>
      <ElevationScroll>
        <DashboardAppBar
          title="Dashboard"
          open={open}
          drawerWidth={240}
          handleDrawerOpen={handleDrawerOpen}
        />
      </ElevationScroll>
      <MenuDrawer
        open={open}
        drawerWidth={240}
        handleDrawerClose={handleDrawerClose}
      />

      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <AdaptiveBox
          reduce={open}
          width={240}
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
