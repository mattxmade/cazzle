"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";

type NewUserFormProps = {
  heading: string;
  userName: string | null;
};

const NewUserForm = ({ heading, userName }: NewUserFormProps) => {
  const [formStep, setFormStep] = useState(0);

  return (
    <Stack component="section" spacing={2}>
      <Typography variant="h1" sx={{ fontSize: 36 }}>
        {heading}
      </Typography>

      <Stepper activeStep={0}>
        <Step completed={false}>
          <StepLabel>Account Setup</StepLabel>
        </Step>

        <Step completed={false}>
          <StepLabel>Account Options</StepLabel>
        </Step>
      </Stepper>

      {formStep === 0 ? (
        <Stack component="form" spacing={2}>
          <FormControl sx={{ maxWidth: "min(100%, 20rem)" }}>
            <FormLabel id="account-name">Name</FormLabel>
            <Input readOnly value={userName ?? ""} />
          </FormControl>
          <FormControl>
            <FormLabel id="account-type">Account type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="account-type"
              name="account-type-radio-buttons-group"
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard"
              />
              <FormControlLabel
                value="estate-agent"
                control={<Radio />}
                label="Estate-agent"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default NewUserForm;
