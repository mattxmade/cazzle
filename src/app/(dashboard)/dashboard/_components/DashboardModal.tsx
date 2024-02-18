"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import SlideTransition from "@/components/mui/transitions/SlideTransition";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

type DashboardModalProps = {
  open: boolean;
  children?: React.ReactNode;
  handleCloseModal: () => void;
};

const DashboardModal = (props: DashboardModalProps) => {
  const { open, children, handleCloseModal } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseModal}
      TransitionComponent={SlideTransition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close property editor modal"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Property Edit
          </Typography>
          <Button autoFocus color="inherit" onClick={handleCloseModal}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
