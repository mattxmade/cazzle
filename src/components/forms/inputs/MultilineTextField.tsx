import { useState } from "react";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";

import generateLabelName from "@/utils/generateLabelName";
import { type Pattern, isValidTextInput } from "@/utils/validateInputs";

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

    const paragraphs = input.value.split("\n\n\n");
    if (paragraphs.some((p) => !isValidTextInput(p, props.id as Pattern))) {
      return;
    }

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
        id={labelName}
        value={text}
        placeholder={props.label}
        onChange={handleTextChange}
        variant="outlined"
        {...layout}
        {...props.textFieldProps}
      />
    </FormControl>
  );
};

export default MultilineTextField;
