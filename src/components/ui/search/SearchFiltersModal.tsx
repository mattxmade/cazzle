"use client";

import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";

import Stack from "@mui/material/Stack/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type SearchFiltersModal = {
  open: boolean;
  children?: React.ReactNode;
  handleClose: () => void;
  handleClearSearchForm: () => void;
};

const SearchFiltersModal = (props: SearchFiltersModal) => {
  const { open, children, handleClose, handleClearSearchForm } = props;

  return (
    <Dialog open={open}>
      <Stack spacing={1} padding={3} paddingTop={1}>
        <Button onClick={handleClose} aria-label="close search form modal">
          <CloseIcon />
        </Button>

        <DialogContent>{children}</DialogContent>

        <Stack direction="row" justifyContent="space-around">
          <Button
            onClick={handleClearSearchForm}
            variant="outlined"
            aria-label="clear search filters "
          >
            Clear
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            aria-label="close search form modal"
          >
            Done
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default SearchFiltersModal;
