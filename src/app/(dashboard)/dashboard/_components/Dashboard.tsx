"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { ClerkLoaded, SignedIn, SignedOut } from "@clerk/nextjs";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import CircularProgress from "@mui/material/CircularProgress";

import PostAddIcon from "@mui/icons-material/PostAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import AdaptiveBox from "@/components/mui/box/AdaptiveBox";
import ElevationScroll from "@/components/mui/ElevationOnScroll";

import MenuItems from "./MenuItems";
import MenuDrawer from "./MenuDrawer";
import DashboardAppBar from "./DashboardAppBar";
import DashboardModal from "./DashboardModal";
import DashboardView from "./DashboardView";
import DashboardItem from "./DashboardItem";

import ProfileForm from "./dashboard-forms/ProfileForm";
import PropertyForm from "./dashboard-forms/PropertyForm";
import AlertDialog from "@/components/ui/feedback/AlertDialog";
import Backdrop from "@/components/ui/feedback/Backdrop";

import Toast from "@/components/ui/feedback/toast/Toast";
import useToast from "@/components/ui/feedback/toast/useToast";

import theme from "@/theme";
import { customTheme } from "@/styles/custom";

import type { PropertyListing_ } from "@/types";
import { validate } from "@/data/validate";
import { getStatus, type DbResponse } from "@/data/dbStatus";
import { saveDocument, getDocuments } from "@/server/actions/agent/agent";
import { BranchDetails, genNewData, validDocumentData } from "@/types/runtime";

export type PartialData = Partial<BranchDetails> | Partial<PropertyListing_>;
type DashboardKey = "property" | "agent";
type DocumentModel = "properties" | "agents" | "";

export type FormDataRef = {
  type: DashboardKey;
  data: PartialData;
} | null;

export type FormErrors = {
  for: DashboardKey;
  errors: PropertyErrors;
};

export type PropertyErrors = {
  [key in keyof Partial<PropertyListing_>]: string;
};

export type ProfileErrors = {
  [key in keyof Partial<BranchDetails>]: string;
};

export type FormDataFunction = (type: DashboardKey, data: PartialData) => void;

type DashboardProps = {
  branch: Partial<BranchDetails>;
  properties: PropertyListing_[];
  children?: React.ReactNode;
};

const menuDrawerWidth = 240;

const menuCarousel = {
  "agent-profile": 0,
  "new-property": 64,
  "properties-list": 64 * 2,
  "new-listing": 64 * 3,
  "view-listings": 64 * 4,
};

const Dashboard = (props: DashboardProps) => {
  const [properties, setProperties] = useState(props.properties);

  const [pending, startTransition] = useTransition();
  const [taskResponse, setTaskResponse] = useState<Omit<
    DbResponse,
    "data"
  > | null>(null);

  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [view, setView] = useState("agent-profile");

  const initialData = useRef<FormDataRef>(null);
  const unsavedData = useRef<PartialData | null>(null);

  const [canSubmitData, setCanSubmitData] = useState(false);
  const [hasDataChanged, setHasDataChanged] = useState(false);

  const alertMessage = useRef<{ title: string; desc?: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const [formErrors, setFormErrors] = useState<{
    for: "agent" | "property";
    errors: PropertyErrors;
  } | null>(null);

  const toastTools = useToast();

  const handleUpdateLocalData: FormDataFunction = (type, updatedData) => {
    if (!initialData.current || !updatedData) return;
    if (initialData.current.type.toLowerCase() !== type.toLowerCase()) return;

    const currData = Object.getOwnPropertyNames(updatedData);
    const prevData = Object.getOwnPropertyNames(initialData.current.data);

    const valuesToUpdate: Partial<PropertyListing_> = {};

    for (let i = 0; i < prevData.length; i++) {
      const key = currData[i];

      if (key) {
        const currDataValue = updatedData[currData[i]];
        valuesToUpdate[currData[i]] = currDataValue;
      }
    }

    unsavedData.current = valuesToUpdate;
    console.log(unsavedData.current);
  };

  const handleNewFormData: FormDataFunction = (type, newData) => {
    if (!genNewData[type] || !newData) return;

    switch (type) {
      case "agent":
        unsavedData.current = {
          ...genNewData[type],
          ...newData,
        } as Partial<BranchDetails>;

        break;

      case "property":
        unsavedData.current = {
          ...genNewData[type],
          ...newData,
        } as Partial<PropertyListing_>;
        break;
    }

    unsavedData.current && !hasDataChanged && setHasDataChanged(true);

    console.log(unsavedData.current);

    unsavedData.current &&
      validDocumentData(type, unsavedData.current) &&
      setCanSubmitData(true);
  };

  const handleSaveChanges = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (pending) return;
    showAlert && setShowAlert(false);

    console.log(unsavedData.current);

    if (!initialData.current || !unsavedData.current) return;

    let documentModel: DocumentModel = "";
    let data: any = {};

    if (initialData.current.type === "agent") {
      documentModel = "agents";

      data = {
        ...initialData.current.data,
        ...unsavedData.current,
      } as BranchDetails;
    }

    if (initialData.current.type === "property") {
      documentModel = "properties";

      data = {
        ...initialData.current.data,
        ...unsavedData.current,
      } as PropertyListing_;
    }

    // TODO: user feedback data is invalid
    if (!data || !documentModel) return;

    // Client side validation
    const { type } = initialData.current;
    const result = validate(type, data);

    // Feedback if form fields are invalid or incomplete
    if (result.errors) {
      console.log(result.errors);
      setFormErrors({ for: type, errors: result.errors });
      return;
    }

    // Data is ok, so create new FormData instance
    const formData = new FormData();

    formData.append("type", documentModel);
    formData.append("data", JSON.stringify(data));

    startTransition(async () => {
      const response = await saveDocument(formData);
      console.log(response);

      if (!response) return setTaskResponse(getStatus.server.error);

      const { status, message } = response;

      // Update Properties state
      if (response.data && response.data.type === "properties") {
        console.log(response.data.document);

        setProperties((prevData) => {
          if (!response.data) return prevData;

          return prevData.map((item) => {
            const dataItem =
              item._id === response.data?.document._id
                ? response.data.document
                : item;

            return dataItem as PropertyListing_;
          });
        });
      }

      const timeout = setTimeout(() => {
        clearTimeout(timeout);

        setTaskResponse({ status, message });
        toastTools.handleOpen();
      }, 2000);

      completeDashboardTask();
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

  const handlLoadscreen = () => {
    setView("loadscreen");

    const resetFlow = setTimeout(() => {
      clearTimeout(resetFlow);

      const lastView = view;
      setView(lastView);

      setTaskResponse({ status: "success", message: "Data cleared" });
      toastTools.handleOpen();
    }, 2000);
  };

  const handleClearData = () => {
    unsavedData.current && handlLoadscreen();

    unsavedData.current = null;
    initialData.current = null;

    setFormErrors(null);
    setHasDataChanged(false);
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

  const handleOpenModal = (type: DashboardKey, data: PropertyListing_) => {
    initialData.current = { type, data };
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    if (!unsavedData.current) return setOpenModal(false);
    handleAlertSetup("Changes will be lost, would you like to save data?");
  }, [openModal]);

  const handleSetView = useCallback(
    (requestedView: string) => {
      setView(requestedView);
      handleClearData();

      if (requestedView === "agent-profile") {
        initialData.current = { type: "agent", data: props.branch };
      }
    },
    [view]
  );

  return (
    <Box>
      <ElevationScroll>
        <DashboardAppBar
          title="Dashboard"
          open={open}
          drawerWidth={menuDrawerWidth}
          handleDrawerOpen={handleDrawerOpen}
        >
          <ClerkLoaded>
            <Stack
              sx={{
                mx: 3,
                position: "relative",
                overflowY: "hidden",
                transition: "0.3s",
                transform: `translate(0 , -${
                  menuCarousel[view as keyof typeof menuCarousel] ?? 0
                }px)`,
              }}
            >
              <Stack sx={{ height: 64 }} justifyContent="center">
                {view === "agent-profile" ? (
                  <ButtonGroup>
                    <Button
                      disabled={!hasDataChanged}
                      variant="contained"
                      color="success"
                    >
                      Save profile
                    </Button>
                    <Button
                      disabled={!hasDataChanged}
                      variant="contained"
                      color="secondary"
                      onClick={handleClearData}
                    >
                      Discard changes
                    </Button>
                  </ButtonGroup>
                ) : null}
              </Stack>

              <Stack sx={{ height: 64 }} justifyContent="center">
                {view === "new-property" ? (
                  <ButtonGroup>
                    <Button
                      disabled={!canSubmitData}
                      variant="contained"
                      color="success"
                    >
                      Submit property
                    </Button>
                    <Button
                      disabled={!hasDataChanged}
                      variant="contained"
                      color="secondary"
                      onClick={handleClearData}
                    >
                      Clear fields
                    </Button>
                  </ButtonGroup>
                ) : null}
              </Stack>

              <Stack sx={{ height: 64 }} justifyContent="center">
                {view === "properties-list" ? <></> : null}
              </Stack>

              <Stack sx={{ height: 64 }} justifyContent="center">
                {view === "new-listing" ? (
                  <ButtonGroup>
                    <Button
                      disabled={!hasDataChanged}
                      variant="contained"
                      color="success"
                    >
                      Submit listing
                    </Button>
                    <Button
                      disabled={!hasDataChanged}
                      variant="contained"
                      color="secondary"
                    >
                      Clear fields
                    </Button>
                  </ButtonGroup>
                ) : null}
              </Stack>

              <Stack sx={{ height: 64 }} justifyContent="center">
                {view === "view-listings" ? <></> : null}
              </Stack>
            </Stack>
          </ClerkLoaded>
        </DashboardAppBar>
      </ElevationScroll>
      <MenuDrawer
        open={open}
        drawerWidth={menuDrawerWidth}
        handleDrawerClose={handleDrawerClose}
      >
        <Divider />
        <MenuItems
          menuItems={[
            {
              name: "agent-profile",
              Icon: <AccountCircleIcon />,
              text: "Agency Profile",
            },
          ]}
          handleMenuItem={handleSetView}
        />

        <Divider />

        <MenuItems
          menuItems={[
            {
              name: "new-property",
              Icon: <AddHomeWorkIcon />,
              text: "New Property",
            },
            {
              name: "properties-list",
              Icon: <HolidayVillageIcon />,
              text: "Properties List",
            },
          ]}
          handleMenuItem={handleSetView}
        />

        <Divider />

        <MenuItems
          menuItems={[
            {
              name: "new-listing",
              Icon: <PostAddIcon />,
              text: "New Listing",
            },
            {
              name: "view-listings",
              Icon: <ListAltIcon />,
              text: "View Listings",
            },
          ]}
          handleMenuItem={handleSetView}
        />
      </MenuDrawer>

      <Box
        className="dashboard-view"
        sx={{
          top: 64,
          position: "relative",
          width: "100%",
          display: "flex",
          height: "calc(100vh - 64px)",
          overflowX: "hidden",
          padding: view === "loadscreen" ? 0 : theme.spacing(4),
          paddingTop: theme.spacing(0),
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
              height: "max-content",
              display: "grid",
              flex: "auto",
              alignContent: "flex-start",
              marginTop: view === "loadscreen" ? 0 : 6,
              marginBottom: view === "loadscreen" ? 0 : 2,
              zIndex: 0,
            }}
          >
            <DashboardView viewName="loadscreen" currentView={view}>
              <Backdrop
                open={true}
                backdropProps={{
                  sx: { height: "calc(100vh - 64px)", position: "relative" },
                }}
              />
            </DashboardView>
            <DashboardView viewName="dashboard" currentView={view}>
              <Typography variant="h2" fontSize={28}>
                Choose a view
              </Typography>
            </DashboardView>
            <DashboardView viewName="agent-profile" currentView={view}>
              <Typography variant="h2" fontSize={28}>
                Agent Profile
              </Typography>
              <ProfileForm />
            </DashboardView>
            <DashboardView viewName="new-property" currentView={view}>
              <Typography variant="h2" fontSize={28}>
                New Property
              </Typography>
              <PropertyForm
                newForm={true}
                propertyData={{} as PropertyListing_}
                handleUpdateLocalData={handleNewFormData}
                formErrors={
                  formErrors?.for === "property" ? formErrors.errors : null
                }
              />
            </DashboardView>
            <DashboardView viewName="properties-list" currentView={view}>
              {properties?.length ? (
                properties.map((propertyData) => (
                  <DashboardItem key={propertyData._id} item={propertyData}>
                    <Button
                      aria-label="edit property"
                      onClick={() => handleOpenModal("property", propertyData)}
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
            <DashboardView viewName="new-listing" currentView={view}>
              <Typography>New Listing</Typography>
            </DashboardView>
            <DashboardView viewName="view-listings" currentView={view}>
              <Typography>View Listings</Typography>
            </DashboardView>
          </AdaptiveBox>
        </SignedIn>
      </Box>

      {taskResponse ? (
        <Toast
          open={toastTools.open}
          message={taskResponse.message}
          handleClose={toastTools.handleClose}
          alertProps={{ severity: taskResponse.status }}
          snackbarProps={{
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          }}
        >
          {taskResponse.message}
        </Toast>
      ) : null}

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

        {initialData.current?.type === "property" ? (
          <PropertyForm
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
