"use client";

import Select, {
  type SelectProps,
  type SelectChangeEvent,
} from "@mui/material/Select";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";

import type { UpdateFormRefFunction } from "@/app/(dashboard)/dashboard/_components/editor/PropertyEditor";

type Props = {
  id: string;
  label: string;
  defaultValue?: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  selectProps?: SelectProps;
  children?: React.ReactNode;
  handleUpdateFormRef: UpdateFormRefFunction;
};

const SelectDropdown = (props: Props) => {
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    if (!e.target.value) return;
    const selectOption = e.target as HTMLSelectElement;
    props.handleUpdateFormRef(props.id, selectOption.value);
  };

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
        onChange={handleSelectChange}
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
