"use client";

import React, { useRef, useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type ComponentProps = {
  name: string;
  values: string[];
};

const TextFieldChipSelect = ({ name, values }: ComponentProps) => {
  const mode = useRef<"edit" | "add" | "">("");

  const [chipValues, setChipValues] = useState([...values]);
  const [currentValue, setCurrentValue] = useState<string>("");

  const handleChipValueSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const chip = e.currentTarget;

    if (!chip.textContent) return;
    if (!chipValues.includes(chip.textContent)) return;

    mode.current = "edit";
    chip.textContent && setCurrentValue(chip.textContent);
  };

  const handleUpdateTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textFieldInput = e.currentTarget;
    setCurrentValue(textFieldInput.value);
  };

  return (
    <>
      <Stack gap={2} direction="row" alignItems="flex-end">
        <TextField
          required
          focused={currentValue ? true : false}
          label={currentValue ? `Edit ${name}` : `New ${name}`}
          id={name}
          size="small"
          value={currentValue}
          onChange={handleUpdateTextField}
          placeholder={!currentValue ? `Edit ${name}` : ""}
        />
      </Stack>

      <Stack gap={1} direction="row" flexWrap="wrap">
        {chipValues.map((value, i) => (
          <Chip
            key={`${value}-${i}`}
            label={value}
            onClick={handleChipValueSelection}
            onDelete={() => {}}
            sx={{
              color: currentValue === value ? "HighlightText" : "ButtonText",
              backgroundColor: currentValue === value ? "Highlight" : "Button",
              ":hover": {
                backgroundColor:
                  currentValue === value ? "Highlight" : "Button",
              },
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default TextFieldChipSelect;
