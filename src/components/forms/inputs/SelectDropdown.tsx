"use client";

import Select, { type SelectProps } from "@mui/material/Select";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";

type Props = {
  id: string;
  label: string;
  defaultValue?: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  selectProps?: SelectProps;
  children?: React.ReactNode;
  handleUpdateFormRef: () => void;
};

const SelectDropdown = (props: Props) => {
  return (
    <FormControl
      required
      variant="outlined"
      sx={{ width: 210 }}
      {...props.formControlProps}
    >
      <InputLabel htmlFor={props.id} {...props.inputLabelProps}>
        {props.label}
      </InputLabel>
      <Select
        autoWidth
        id={props.id}
        label={props.label}
        defaultValue={props.defaultValue ?? ""}
        SelectDisplayProps={{
          style: {
            backgroundColor: "inherit",
          },
        }}
        {...props.selectProps}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
