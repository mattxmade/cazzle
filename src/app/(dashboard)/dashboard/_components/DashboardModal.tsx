"use client";

import Dialog from "@mui/material/Dialog";
import SlideTransition from "@/components/mui/transitions/SlideTransition";

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
      {children}
    </Dialog>
  );
};

export default DashboardModal;
