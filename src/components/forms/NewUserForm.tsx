"use client";

import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
  const [formStep, setFormStep] = useState(0);

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    accountName: userName ?? "",
    accountType: "standard",
    accountOptions: {},
  });

  const handleMoveToNextStep = (
    step: number,
    validateStep: ({ step }: { step: number }) => boolean
  ) => validateStep({ step }) && setFormStep(step + 1);

  const handleMoveToPrevStep = () => setFormStep((prevStep) => prevStep - 1);

  const isStepComplete = ({ step }: { step: number }) => {
    const { accountName, accountType, accountOptions } = accountDetails;

    if (step === 0) {
      return accountName && accountType ? true : false;
    }

    if (step === 1) {
      return accountName && accountType ? true : false;
      // + accountOptions
    }

    return false;
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formInput = e.currentTarget as HTMLInputElement;
    const { value } = formInput;

    if (value === "branch" || value === "standard") {
      setAccountDetails({ ...accountDetails, accountType: value });
    }
  };

  const isStepOneComplete = isStepComplete({ step: 0 });
  const isStepTwoComplete = isStepComplete({ step: 1 });

  return (
    <Stack component="section" sx={{ alignItems: "center", padding: 6 }}>
      <Typography variant="h1" sx={{ alignSelf: "flex-start", fontSize: 36 }}>
        {heading}
      </Typography>

      <Stepper
        orientation="vertical"
        activeStep={formStep}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 1,
        }}
      >
        <Step completed={formStep >= 1}>
          <StepLabel>Account Setup {formStep}</StepLabel>
          <StepContent>
            <Card
              elevation={4}
              sx={{
                padding: 4,
                marginLeft: 2,
                backdropFilter: "blur(2px)",
                backgroundColor: "hsl(0 0% 100%/.6)",
              }}
            >
              {formStep === 0 ? (
                <Stack component="form" spacing={4}>
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
                onClick={() => handleMoveToNextStep(formStep, isStepComplete)}
                sx={{
                  my: 2,
                  width: "fit-content",
                  cursor: !isStepOneComplete ? "auto" : "pointer",
                  color: !isStepOneComplete ? "darkgrey" : "#fff",
                  backgroundColor: !isStepOneComplete ? "lightgrey" : "#1976d2",
                  ":hover": {
                    backgroundColor: !isStepOneComplete
                      ? "lightgrey"
                      : "#1565c0",
                    boxShadow: !isStepOneComplete
                      ? "none"
                      : "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                  },
                }}
              >
                Next
              </Button>
            </Card>
          </StepContent>
        </Step>

        <Step completed={formStep >= 2}>
          <StepLabel>Account Options {formStep}</StepLabel>
          <StepContent>
            {formStep >= 1 && accountDetails.accountType === "standard" ? (
              <StandardAccountStep>
                <Button
                  variant="outlined"
                  onClick={handleMoveToPrevStep}
                  sx={{ width: "fit-content" }}
                >
                  Back
                </Button>
              </StandardAccountStep>
            ) : null}
            {formStep >= 1 && accountDetails.accountType === "branch" ? (
              <BranchAccountStep>
                <Button
                  variant="outlined"
                  onClick={handleMoveToPrevStep}
                  sx={{ width: "fit-content" }}
                >
                  Back
                </Button>
              </BranchAccountStep>
            ) : null}
          </StepContent>
        </Step>
      </Stepper>
    </Stack>
  );
};

export default NewUserForm;
