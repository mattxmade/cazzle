import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";

import { useState } from "react";
import generateLabelName from "@/utils/generateLabelName";

type MultilineTextFieldProps = {
  rows?: number;
  label: string;
  defaultValue?: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  textFieldProps?: TextFieldProps;
  handleUpdateFormRef: (name: string, data: string) => void;
};

const MultilineTextField = (props: MultilineTextFieldProps) => {
  const [text, setText] = useState(props.defaultValue ?? "");

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
    <FormControl
      fullWidth
      variant="filled"
      required
      sx={{ m: 1 }}
      {...props.formControlProps}
    >
      <InputLabel
        htmlFor={labelName}
        sx={{ fontSize: 24, inset: "auto", left: -4, bottom: 16 }}
        {...props.inputLabelProps}
      >
        {!text.length ? props.label : ""}
      </InputLabel>
      <TextField
        {...layout}
        id={labelName}
        value={text}
        variant="outlined"
        onChange={handleTextChange}
        {...props.textFieldProps}
      />
    </FormControl>
  );
};

export default MultilineTextField;