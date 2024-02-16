"use client";

import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type ModalProps = {
  children?: React.ReactNode;
};

const FavouritesModal = (props: ModalProps) => {
  const currentList = "default";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleListChange = () => {};

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Favourites List Manager</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">
                Current List
              </InputLabel>

              <Select
                labelId="list-select-label"
                id="list-dialog-select"
                value={currentList}
                onChange={handleListChange}
                input={<OutlinedInput label="Current List" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="default">Default</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FavouritesModal;
