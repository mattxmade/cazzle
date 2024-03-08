"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Box from "@mui/material/Box";
import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import MenuItems from "./MenuItems";
import MenuDrawer from "./MenuDrawer";

import DashboardAppBar from "./DashboardAppBar";
import DashboardModal from "./DashboardModal";
import DashboardView from "./DashboardView";
import DashboardItem from "./DashboardItem";

import PropertyEditor from "./editor/PropertyEditor";
import AlertDialog from "@/components/ui/feedback/AlertDialog";
import Backdrop from "@/components/ui/feedback/Backdrop";

import theme from "@/theme";
import { customTheme } from "@/styles/custom";

import { validate } from "@/data/validate";
import type { PropertyListing_ } from "@/types";
import { type DbResponse } from "@/data/dbStatus";
import { type AgentModel, updateDocument } from "@/server/actions/agent/agent";

export type FormDataRef = {
  type: string;
  data: Partial<PropertyListing_>;
} | null;

export type FormErrors = {
  for: "property" | "listing";
  errors: PropertyErrors;
};

export type PropertyErrors = {
  [key in keyof Partial<PropertyListing_>]: string;
};

export type UpdateFormDataFuncion = (
  type: string,
  updatedData: Partial<PropertyListing_>
) => void;

type DashboardProps = {
  properties: PropertyListing_[];
  children?: React.ReactNode;
};

const menuDrawerWidth = 240;

const Dashboard = (props: DashboardProps) => {
  const [pending, startTransition] = useTransition();
  const [serverResponse, setServerResponse] = useState<DbResponse | null>(null);

  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [view, setView] = useState<string>("properties-view");

  const initialData = useRef<FormDataRef>(null);
  const unsavedData = useRef<Partial<PropertyListing_> | null>(null);

  const alertMessage = useRef<{ title: string; desc?: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const [formErrors, setFormErrors] = useState<{
    for: "property" | "listing";
    errors: PropertyErrors;
  } | null>(null);

  const handleUpdateLocalData: UpdateFormDataFuncion = (type, updatedData) => {
    if (!initialData.current || !updatedData) return;
    if (initialData.current.type.toLowerCase() !== type.toLowerCase()) return;

    const currData = Object.getOwnPropertyNames(updatedData);
    const prevData = Object.getOwnPropertyNames(initialData.current.data);

    const valuesToUpdate: Partial<PropertyListing_> = {};

    for (let i = 0; i < prevData.length; i++) {
      const prevDataValue = initialData.current.data[prevData[i]];
      const currDataValue = updatedData[currData[i]];

      currDataValue !== prevDataValue &&
        updatedData[currData[i]] &&
        (valuesToUpdate[currData[i]] = updatedData[currData[i]]);
    }

    unsavedData.current = valuesToUpdate;
  };

  const handleSaveChanges = async (
    e: React.PointerEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (pending) return;
    showAlert && setShowAlert(false);

    if (!initialData.current || !unsavedData.current) return;

    // TODO
    const documentType =
      initialData.current.type === "Property" ? "properties" : "agents";

    const data = {
      ...initialData.current.data,
      ...unsavedData.current,
    } as PropertyListing_;

    const result = validate("property", data);

    if (result.errors) {
      console.log(result.errors);
      setFormErrors({ for: "property", errors: result.errors });
      return;
    }

    const formData = new FormData();

    formData.append("type", documentType);
    formData.append("data", JSON.stringify(data));

    startTransition(async () => {
      const response = await updateDocument(formData);
      console.log(response);

      response && setServerResponse(response);
      response.status === "success" ? completeDashboardTask() : null;
    });
  };

  const completeDashboardTask = () => {
    handleClearData();
    handleCloseAllDialogs();
  };

  const handleCloseWithoutSaving = () => {
    handleClearData();
    handleCloseAllDialogs();
  };

  const handleClearData = () => {
    initialData.current = null;
    unsavedData.current = null;
    setFormErrors(null);
  };

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleCloseAllDialogs = () => {
    alertMessage.current = null;
    setOpenModal(false);
    setShowAlert(false);
  };

  const handleAlertSetup = (title: string, desc?: string) => {
    alertMessage.current = { title, desc };
    setShowAlert(true);
  };

  const handleOpenModal = (type: string, data: PropertyListing_) => {
    initialData.current = { type, data };
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    if (!unsavedData.current) return setOpenModal(false);
    handleAlertSetup("Changes will be lost, would you like to save data?");
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
        <SignedOut>
          <Backdrop open={true} />
        </SignedOut>

        <SignedIn>
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
                    Properties will be listed here - press the + icon to add
                    your first property
                  </Typography>
                </Box>
              )}
            </DashboardView>
          </AdaptiveBox>
        </SignedIn>
      </Box>

      <DashboardModal
        title={initialData.current?.type}
        handleCloseModal={handleCloseModal}
        action={
          <Button
            autoFocus
            color="inherit"
            onClick={handleSaveChanges}
            sx={{ ":hover": { cursor: !pending ? "pointer" : "auto" } }}
          >
            {!pending ? "Save" : <CircularProgress color="inherit" size={25} />}
          </Button>
        }
        muiProps={{
          dialogProps: {
            open: openModal,
          },
          dialogContent: {
            sx: { backgroundColor: customTheme.backgroundColor.dashboard.main },
          },
        }}
      >
        {showAlert && alertMessage.current ? (
          <AlertDialog
            open={showAlert}
            title={alertMessage.current.title}
            desc={alertMessage.current.desc}
            handleClose={() => {}}
          >
            <Button onClick={handleCloseWithoutSaving}>Close</Button>
            <Button onClick={handleSaveChanges} autoFocus>
              Save
            </Button>
          </AlertDialog>
        ) : null}

        {initialData.current?.type === "Property" ? (
          <PropertyEditor
            formErrors={
              formErrors?.for === "property" ? formErrors.errors : null
            }
            handleUpdateLocalData={handleUpdateLocalData}
            propertyData={initialData.current.data as PropertyListing_}
          />
        ) : null}
      </DashboardModal>
    </Box>
  );
};

export default Dashboard;
