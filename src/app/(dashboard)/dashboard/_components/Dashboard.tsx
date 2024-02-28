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

export type DataRef = {
  type: string;
  data: Partial<PropertyListing_>;
} | null;

export type UpdateDataFunction = (updatedData: DataRef) => void;

const Dashboard = (props: DashboardProps) => {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<string>("properties-view");

  const [openModal, setOpenModal] = useState(false);
  const initialData = useRef<DataRef>(null);

  const handleUpdateData: UpdateDataFunction = (updatedData) => {
    let saveData = false;

    if (!initialData.current || !updatedData) return;
    if (initialData.current.type !== updatedData.type) return;

    const dataType = initialData.current.type;

    const currData = Object.getOwnPropertyNames(updatedData.data);
    const prevData = Object.getOwnPropertyNames(initialData.current.data);

    if (currData.length !== prevData.length) return;

    console.log(prevData);
    console.log(currData);

    const valuesToUpdate: Partial<PropertyListing_> = {};

    for (let i = 0; i < prevData.length; i++) {
      const prevDataValue = initialData.current.data[prevData[i]];
      const currDataValue = updatedData.data[currData[i]];

      console.log(prevDataValue, currDataValue);

      currDataValue !== prevDataValue &&
        (valuesToUpdate[currData[i]] = updatedData.data[currData[i]]);
    }

    console.log(valuesToUpdate);

    initialData.current = null;
  };

  const handleClearData = () => (initialData.current = null);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleOpenModal = (type: string, data: PropertyListing_) => {
    initialData.current = { type, data };
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);

    const resetDataAfterDelay = setTimeout(() => {
      clearTimeout(resetDataAfterDelay);
      handleClearData();
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
        title={initialData.current?.type}
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
        {initialData.current?.type === "Property" ? (
          <PropertyEditor
            handleUpdateData={handleUpdateData}
            propertyData={initialData.current.data as PropertyListing_}
          />
        ) : null}
      </DashboardModal>
    </Box>
  );
};

export default Dashboard;
