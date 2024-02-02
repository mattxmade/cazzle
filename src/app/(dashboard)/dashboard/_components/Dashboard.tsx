"use client";

import { useState } from "react";
import Container from "@mui/material/Container";

import DashboardAppBar from "./DashboardAppBar";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <DashboardAppBar
        title="Dashboard"
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
    </Container>
  );
};

export default Dashboard;
