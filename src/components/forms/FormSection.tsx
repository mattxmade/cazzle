import { Fragment } from "react";

import Card from "@mui/material/Card";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type FormSectionProps = {
  Icon?: React.ReactNode;
  heading: string;
  children?: React.ReactNode;
  stackProps?: StackProps;
};

const FormSection = (props: FormSectionProps) => (
  <Fragment>
    <Stack gap={0.5} direction="row" alignItems="center">
      {props.Icon}
      <Typography variant="h6" color="darkslategrey">
        {props.heading}
      </Typography>
    </Stack>
    <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Stack
        gap={2}
        direction="row"
        alignItems="flex-end"
        {...props.stackProps}
      >
        {props.children}
      </Stack>
    </Card>
  </Fragment>
);

export default FormSection;
