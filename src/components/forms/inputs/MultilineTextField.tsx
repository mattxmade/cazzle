import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";

import { useState } from "react";
import generateLabelName from "@/utils/generateLabelName";

type MultilineTextFieldProps = {
  id: string;
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

  const rows = props.rows;
  const labelName = generateLabelName(props.label.toLowerCase());

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    props.handleUpdateFormRef(props.id, input.value);
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
      required
      variant="filled"
      sx={{ m: 1 }}
      {...props.formControlProps}
    >
      <TextField
        {...layout}
        id={labelName}
        variant="outlined"
        defaultValue={text}
        placeholder={props.label}
        onChange={handleTextChange}
        {...props.textFieldProps}
      />
    </FormControl>
  );
};

export default MultilineTextField;
