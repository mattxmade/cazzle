"use client";

import Dialog from "@mui/material/Dialog";

type DashboardModalProps = {
  open?: boolean;
  children?: React.ReactNode;
};

const DashboardModal = ({ open, children }: DashboardModalProps) => {
  return <Dialog open={open ?? false}>{children}</Dialog>;
};

export default DashboardModal;
