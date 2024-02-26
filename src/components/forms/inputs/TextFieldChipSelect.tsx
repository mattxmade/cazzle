"use client";

import React, { useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type ComponentProps = {
  chipValues: string[];
};

const TextFieldChipSelect = ({ chipValues }: ComponentProps) => {
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  return (
    <>
      <Stack gap={2} direction="row" alignItems="flex-end">
        <TextField
          required
          label={currentValue ? "Edit feature" : "New feature"}
          id="feature"
          size="small"
          value={currentValue}
          onChange={() => {}}
          placeholder={!currentValue ? "Enter feature" : ""}
        />
      </Stack>

      <Stack gap={1} direction="row" flexWrap="wrap">
        {chipValues.map((value, i) => (
          <Chip
            key={`${value}-${i}`}
            label={value}
            onClick={() => {}}
            onDelete={() => {}}
          />
        ))}
      </Stack>
    </>
  );
};

export default TextFieldChipSelect;
