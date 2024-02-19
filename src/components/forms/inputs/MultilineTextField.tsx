import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useState } from "react";
import generateLabelName from "@/utils/generateLabelName";
import { PropertyListing_ } from "@/types";

type MultilineTextFieldProps = {
  rows?: number;
  label: string;
  initialText?: string;
  handleUpdateFormRef: (name: string, data: string) => void;
};

const MultilineTextField = (props: MultilineTextFieldProps) => {
  const [text, setText] = useState(props.initialText ?? "");

  const rows = props.rows ?? 5;
  const labelName = generateLabelName(props.label.toLowerCase());

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setText(input.value);
  };

  const layout = {
    rows,
    multiline: true,
    fullWidth: true,
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <InputLabel sx={{ fontSize: 24, top: 90 }} htmlFor={labelName}>
        {!text.length ? props.label : ""}
      </InputLabel>
      <TextField
        {...layout}
        id={labelName}
        value={text}
        variant="outlined"
        onChange={handleTextChange}
      />
    </FormControl>
  );
};

export default MultilineTextField;
