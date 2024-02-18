"use client";

import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import MenuItems from "./MenuItems";
import MenuDrawer from "./MenuDrawer";

import DashboardAppBar from "./DashboardAppBar";
import DashboardModal from "./DashboardModal";
import DashboardView from "./DashboardView";
import DashboardItem from "./DashboardItem";

import theme from "@/theme";
import { customTheme } from "@/styles/custom";
import { PropertyListing_ } from "@/types";

const menuDrawerWidth = 240;

type DashboardProps = {
  properties: PropertyListing_[];
  children?: React.ReactNode;
};

const Dashboard = (props: DashboardProps) => {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<string>("properties-view");

  const [openModal, setOpenModal] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleCloseModal = useCallback(() => setOpenModal(false), [openModal]);

  const handleMenuItem = useCallback(() => {}, []);

  const properties = props.properties; // convex.API

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
        <MenuItems
          menuItems={[
            { name: "details", icon: "details", text: "Agency Details" },
          ]}
          handleMenuItem={handleMenuItem}
        />

        <Divider />

        <MenuItems
          menuItems={[
            { name: "addProperty", icon: "addProperty", text: "Add Property" },
            { name: "properties", icon: "properties", text: "Properties List" },
          ]}
          handleMenuItem={handleMenuItem}
        />

        <Divider />

        <MenuItems
          menuItems={[
            { name: "newListing", icon: "newListing", text: "New Listing" },
            { name: "listings", icon: "listings", text: "View Listings" },
          ]}
          handleMenuItem={handleMenuItem}
        />
      </MenuDrawer>

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          padding: theme.spacing(4),
          backgroundColor: customTheme.backgroundColor.dashboard.main,
        }}
      >
        <AdaptiveBox
          reduce={open}
          width={menuDrawerWidth}
          margin={65}
          sx={{
            gap: theme.spacing(1),
            display: "grid",
            marginTop: 9,
            marginBottom: 2,
          }}
        >
          <DashboardView viewName="properties-view" currentView={view}>
            {properties?.length ? (
              properties.map((propertyData) => (
                <DashboardItem item={propertyData}>
                  <Button aria-label="edit property">
                    <BorderColorOutlinedIcon />
                  </Button>
                </DashboardItem>
              ))
            ) : (
              <p>
                Properties will be listed here - press the + icon to add your
                first property
              </p>
            )}
          </DashboardView>
        </AdaptiveBox>
      </Box>

      <DashboardModal open={openModal} handleCloseModal={handleCloseModal}>
        <Typography>Dashboard Modal</Typography>
      </DashboardModal>
    </Box>
  );
};

export default Dashboard;
