"use client";

import React, { useRef, useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

import type { UpdateFormRefFunction } from "@/app/(dashboard)/dashboard/_components/editor/PropertyEditor";

type ComponentProps = {
  id: string;
  label: string;
  values: string[];
  textFieldProps?: TextFieldProps;
  updateFormRef: UpdateFormRefFunction;
};

const TextFieldChipSelect = (props: ComponentProps) => {
  const { id, label, values, updateFormRef } = props;
  const mode = useRef<"edit" | "add" | "">("");

  const [chipValues, setChipValues] = useState([...values]);
  const [currentChip, setCurrentChip] = useState<{
    value: string;
    index: number | null;
  }>({ value: "", index: null });

  const handleChipSelect = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const chip = e.currentTarget;

    if (!chip.textContent) return;
    if (!chipValues.includes(chip.textContent)) return;

    mode.current = "edit";
    chip.textContent && setCurrentChip({ value: chip.textContent, index: i });
  };

  const handleClear = () => {
    mode.current = "";
    setCurrentChip({ value: "", index: null });
  };

  const handleChipSave = () => {
    // EDIT ENTRY
    if (mode.current === "edit") {
      const updateChipValues = chipValues.map((chip, i) => {
        if (currentChip.index === i) return currentChip.value;

        return chip;
      });

      setChipValues(updateChipValues);
      updateFormRef(id, updateChipValues);
      return handleClear();
    }

    // NEW ENTRY
    if (currentChip.value && !currentChip.index) {
      setChipValues((prevChipValues) => [...prevChipValues, currentChip.value]);
      updateFormRef(id, [...chipValues, currentChip.value]);
      return handleClear();
    }
  };

  const handleChipRemove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const chip = e.currentTarget;

    if (!chip.textContent && currentChip.index === i) {
      handleClear();
    }

    setChipValues((prevChipValues) => {
      const values = prevChipValues.filter(
        (chipValue, index) => chip.textContent !== chipValue && i !== index
      );

      updateFormRef(id, values);
      return values;
    });
  };

  const handleUpdateTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textFieldInput = e.currentTarget;
    setCurrentChip({ value: textFieldInput.value, index: currentChip.index });
  };

  return (
    <>
      <Stack gap={0.5} direction="row" alignItems="center">
        <TextField
          required
          focused={currentChip.value ? true : false}
          label={
            currentChip.value || mode.current === "edit"
              ? `Edit ${label}`
              : `New ${label}`
          }
          id={id}
          size="small"
          value={currentChip.value}
          onChange={handleUpdateTextField}
          placeholder={!currentChip ? `Edit ${label}` : ""}
          {...props.textFieldProps}
        />

        <IconButton
          onClick={handleChipSave}
          aria-label={"save " + label}
          aria-disabled={!currentChip.value}
          sx={{
            padding: 0.1,
            borderRadius: 1,
            cursor: currentChip.value ? "pointer" : "auto",

            ":hover": {
              backgroundColor: currentChip.value ? "Button" : "inherit",
            },
          }}
        >
          <SaveIcon color={currentChip.value ? "primary" : "disabled"} />
        </IconButton>
      </Stack>

      <Stack gap={1} direction="row" flexWrap="wrap">
        {chipValues.map((value, index) => (
          <Chip
            key={`${value}-${index}`}
            label={value}
            onClick={(e) => handleChipSelect(e, index)}
            onDelete={(e) => handleChipRemove(e, index)}
            sx={{
              color:
                currentChip.index === index ? "HighlightText" : "ButtonText",
              backgroundColor:
                currentChip.index === index ? "Highlight" : "Button",
              ":hover": {
                backgroundColor:
                  currentChip.index === index ? "Highlight" : "Button",
              },
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default TextFieldChipSelect;
