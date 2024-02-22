"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
import PropertyEditor from "./editor/PropertyEditor";

const menuDrawerWidth = 240;

type DashboardProps = {
  properties: PropertyListing_[];
  children?: React.ReactNode;
};

const Dashboard = (props: DashboardProps) => {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<string>("properties-view");

  const [openModal, setOpenModal] = useState(false);
  const modalData = useRef<{ type: string; data: PropertyListing_ } | null>(
    null
  );

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleOpenModal = (type: string, data: PropertyListing_) => {
    modalData.current = { type, data };
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);

    const resetModalDataAfterDelay = setTimeout(() => {
      clearTimeout(resetModalDataAfterDelay);
      modalData.current = null;
    }, 10);
  }, [openModal]);

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
          display: "flex",
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
            flex: "auto",
            alignContent: "flex-start",
            marginTop: 9,
            marginBottom: 2,
          }}
        >
          <DashboardView viewName="properties-view" currentView={view}>
            {properties?.length ? (
              properties.map((propertyData) => (
                <DashboardItem key={propertyData._id} item={propertyData}>
                  <Button
                    aria-label="edit property"
                    onClick={() => handleOpenModal("Property", propertyData)}
                  >
                    <BorderColorOutlinedIcon />
                  </Button>
                </DashboardItem>
              ))
            ) : (
              <Box
                flex="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h6" color="darkslategrey">
                  Properties will be listed here - press the + icon to add your
                  first property
                </Typography>
              </Box>
            )}
          </DashboardView>
        </AdaptiveBox>
      </Box>

      <DashboardModal
        title={modalData.current?.type}
        handleCloseModal={handleCloseModal}
        muiProps={{
          dialogProps: {
            open: openModal,
          },
          dialogContent: {
            sx: { backgroundColor: customTheme.backgroundColor.dashboard.main },
          },
        }}
      >
        {modalData.current?.type === "Property" ? (
          <PropertyEditor
            propertyData={modalData.current.data as PropertyListing_}
          />
        ) : null}
      </DashboardModal>
    </Box>
  );
};

export default Dashboard;
