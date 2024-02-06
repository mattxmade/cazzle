"use client";

import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";

import Stack from "@mui/material/Stack/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type SearchFiltersModal = {
  open: boolean;
  handleClose: () => void;
};

const SearchFiltersModal = ({ open, handleClose }: SearchFiltersModal) => {
  return (
    <Dialog open={open}>
      <Stack spacing={1}>
        <Button onClick={handleClose} aria-label="close search form modal">
          <CloseIcon />
        </Button>

        <DialogContent>Content</DialogContent>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined" aria-label="clear search filters ">
            Clear
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            aria-label="apply search filters and close search form modal"
          >
            Done
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default SearchFiltersModal;
