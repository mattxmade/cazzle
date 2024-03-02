import { useState } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

import formatPrice from "@/utils/formatPrice";
import generateLabelName from "@/utils/generateLabelName";
import extractNumberFromString from "@/utils/extractNumberFromString";
import { type Pattern, isValidInput } from "@/utils/validateInputs";

type MultilineTextFieldProps = {
  id: string;
  label: string;
  formatter?: { method: Function; args: any };
  validation?: Pattern;
  defaultValue?: string | number;
  textFieldProps?: TextFieldProps;
  handleUpdateFormRef: (name: string, data: string | number) => void;
};

const MultilineTextField = (props: MultilineTextFieldProps) => {
  const [text, setText] = useState(props.defaultValue ?? "");
  const labelName = generateLabelName(props.label.toLowerCase());

  const handleValidInput = (value: any) => {
    props.handleUpdateFormRef(props.id, value);

    !props.formatter
      ? setText(value)
      : setText(props.formatter.method(value, ...props.formatter.args));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (!props.validation) return handleValidInput(input.value);

    switch (props.validation) {
      case "number":
        isValidInput(input.value, "number") &&
          handleValidInput(extractNumberFromString(input.value));
        break;

      case "currency":
        if (!isValidInput(input.value, "currency")) return;

        const priceAsNumber = extractNumberFromString(input.value);
        props.handleUpdateFormRef(props.id, priceAsNumber);
        setText(formatPrice(priceAsNumber, "GBP", undefined, true));
        break;

      case "multiline":
        const paragraphs = input.value.split("\n\n\n");

        if (paragraphs.some((p) => !isValidInput(p, "multiline"))) {
          return;
        }

        handleValidInput(input.value);
        break;

      default:
        isValidInput(input.value, props.validation) &&
          handleValidInput(input.value);
    }
  };

  return (
    <TextField
      id={props.id}
      label={labelName}
      value={text}
      placeholder={props.label}
      onChange={handleTextChange}
      size="small"
      required={true}
      variant="outlined"
      {...props.textFieldProps}
      sx={{
        maxWidth: props.textFieldProps?.fullWidth ? "100%" : 210,
        ...props.textFieldProps?.sx,
      }}
      InputProps={{
        sx: { alignItems: "baseline" },
        ...props.textFieldProps?.InputProps,
      }}
    />
  );
};

export default MultilineTextField;
