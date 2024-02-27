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

  const handleChipRemove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const chip = e.currentTarget;

    if (!chip.textContent && currentChip.index === i) {
      setCurrentChip({ value: "", index: null });
    }

    setChipValues((prevChipValues) =>
      prevChipValues.filter(
        (chipValue, index) => chip.textContent !== chipValue && i !== index
      )
    );
  };

  const handleUpdateTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textFieldInput = e.currentTarget;

    if (mode.current === "add") {
    }

    if (mode.current === "edit") {
      setCurrentChip({ value: textFieldInput.value, index: currentChip.index });

      const updateChipValues = chipValues.map((chip, i) => {
        if (currentChip.value === chip && currentChip.index === i)
          return textFieldInput.value;

        return chip;
      });

      console.log(updateChipValues);
      setChipValues(updateChipValues);
    }
  };

  return (
    <>
      <Stack gap={2} direction="row" alignItems="flex-end">
        <TextField
          required
          focused={currentChip.value ? true : false}
          label={currentChip.value ? `Edit ${name}` : `New ${name}`}
          id={name}
          size="small"
          value={currentChip.value}
          onChange={handleUpdateTextField}
          placeholder={!currentChip ? `Edit ${name}` : ""}
        />
      </Stack>

      <Stack gap={1} direction="row" flexWrap="wrap">
        {chipValues.map((value, i) => (
          <Chip
            key={`${value}-${i}`}
            label={value}
            onClick={(e) => handleChipSelect(e, i)}
            onDelete={(e) => handleChipRemove(e, i)}
            sx={{
              color:
                currentChip.value === value ? "HighlightText" : "ButtonText",
              backgroundColor:
                currentChip.value === value ? "Highlight" : "Button",
              ":hover": {
                backgroundColor:
                  currentChip.value === value ? "Highlight" : "Button",
              },
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default TextFieldChipSelect;
