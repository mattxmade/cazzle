"use client";

import { useEffect, useRef, useState } from "react";

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

import StandardAccountStep from "./new-user-form-steps/StandardAccountStep";
import BranchAccountStep from "./new-user-form-steps/BranchAccountStep";

type AccountDetails = {
  accountName: string;
  accountType: "standard" | "branch" | "";
  accountOptions: any;
};

type NewUserFormProps = {
  heading: string;
  userName: string | null;
};

const NewUserForm = ({ heading, userName }: NewUserFormProps) => {
  const formStep = useRef(0);

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    accountName: userName ?? "",
    accountType: "",
    accountOptions: {},
  });

  const updateStepsCompleted = (params: AccountDetails) => {
    const { accountName, accountType, accountOptions } = params;
    formStep.current = 0;

    if (accountName && accountType) formStep.current = 1;
    // if (Object.values(accountOptions)) formStep.current = 2;
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formInput = e.currentTarget as HTMLInputElement;
    const { value } = formInput;

    if (value === "branch" || value === "standard") {
      const { accountName, accountOptions } = accountDetails;

      updateStepsCompleted({ accountName, accountOptions, accountType: value });
      setAccountDetails({ ...accountDetails, accountType: value });
    }
  };

  return (
    <Stack component="section" spacing={2}>
      <Typography variant="h1" sx={{ fontSize: 36 }}>
        {heading}
      </Typography>

      <Stepper activeStep={formStep.current}>
        <Step completed={formStep.current >= 1}>
          <StepLabel>Account Setup {formStep.current}</StepLabel>
        </Step>

        <Step completed={formStep.current >= 2}>
          <StepLabel>Account Options {formStep.current}</StepLabel>
        </Step>
      </Stepper>

      {formStep.current === 0 ? (
        <Stack component="form" spacing={2}>
          <FormControl sx={{ maxWidth: "min(100%, 20rem)" }}>
            <FormLabel id="account-name">Name</FormLabel>
            <Input readOnly value={accountDetails.accountName} />
          </FormControl>

          <FormControl>
            <FormLabel id="account-type">Account type</FormLabel>
            <RadioGroup
              row
              value={accountDetails.accountType}
              onChange={handleAccountTypeChange}
              aria-labelledby="account-type"
              name="account-type-radio-buttons-group"
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard account"
              />
              <FormControlLabel
                value="branch"
                control={<Radio />}
                label="Branch account"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      ) : null}

      {formStep.current >= 1 && accountDetails.accountType === "standard" ? (
        <StandardAccountStep />
      ) : null}
      {formStep.current >= 1 && accountDetails.accountType === "branch" ? (
        <BranchAccountStep />
      ) : null}
    </Stack>
  );
};

export default NewUserForm;
