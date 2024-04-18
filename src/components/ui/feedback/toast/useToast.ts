"use client";

import { useCallback, useState } from "react";

import Toast from "./Toast";

const useToast = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    Toast,
    handleOpen,
    handleClose,
  };
};

export default useToast;
