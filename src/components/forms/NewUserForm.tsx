"use client";

import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import StepContent from "@mui/material/StepContent";

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

  const isStepComplete = ({ step }: { step: number }) => {
    const { accountName, accountType, accountOptions } = accountDetails;

    if (step === 0) {
      return accountName && accountType ? true : false;
    }

    if (step === 1) {
      return accountName && accountType ? true : false;
      // + accountOptions
    }
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formInput = e.currentTarget as HTMLInputElement;
    const { value } = formInput;

    if (value === "branch" || value === "standard") {
      const { accountName, accountOptions } = accountDetails;

      // updateStepsCompleted({ accountName, accountOptions, accountType: value });
      setAccountDetails({ ...accountDetails, accountType: value });
    }
  };

  const isStepOneComplete = isStepComplete({ step: 0 });
  const isStepTwoComplete = isStepComplete({ step: 1 });

  return (
    <Stack component="section" spacing={2}>
      <Typography variant="h1" sx={{ fontSize: 36 }}>
        {heading}
      </Typography>

      <Stepper orientation="vertical" activeStep={formStep.current}>
        <Step completed={formStep.current >= 1}>
          <StepLabel>Account Setup {formStep.current}</StepLabel>
          <StepContent>
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

            <Button
              variant="contained"
              aria-label="go to next form section"
              aria-disabled={isStepOneComplete}
              sx={{
                width: "fit-content",
                cursor: !isStepOneComplete ? "auto" : "initial",
                color: !isStepOneComplete ? "darkgrey" : "initial",
                backgroundColor: !isStepOneComplete ? "lightgrey" : "initial",
                ":hover": {
                  backgroundColor: !isStepOneComplete ? "lightgrey" : "initial",
                  boxShadow: !isStepOneComplete ? "none" : "initial",
                },
              }}
            >
              Next
            </Button>
          </StepContent>
        </Step>

        <Step completed={formStep.current >= 2}>
          <StepLabel>Account Options {formStep.current}</StepLabel>
          <StepContent>
            {formStep.current >= 1 &&
            accountDetails.accountType === "standard" ? (
              <StandardAccountStep />
            ) : null}
            {formStep.current >= 1 &&
            accountDetails.accountType === "branch" ? (
              <BranchAccountStep />
            ) : null}
          </StepContent>
        </Step>
      </Stepper>
    </Stack>
  );
};

export default NewUserForm;
