"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Mui Components
 */

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

/**
 * Types
 */
import { type CurrencyKeys } from "@/utils/currencies";

/**
 * Utility functions
 */
import formatPrice from "@/utils/formatPrice";
import calculateRepayments from "@/utils/calculateRepayments";
import extractNumberFromString from "@/utils/extractNumberFromString";

/**
 * Custom React Components
 */
import RangeInputSection from "./inputs/RangeInputSection";
import SelectInputSection from "./inputs/SelectInputSection";
import TextInputSection from "./inputs/TextInputSection";
import MultilineTextField from "../forms/inputs/MultilineTextField";

type HousePriceProps = {
  label?: string;
  defaultValue?: number;
};

type CostResultSelectProps = {
  options?: [string, string];
};

type DepositAmountProps = {
  label?: string;
  defaultValue?: number;
};

type TermLengthProps = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 1; min: 0; max: number };
};

type AnnualInterestProps = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 0.1; min: 1; max: number };
};

type MortgageCalcInputValues = {
  [index: string]: number | string;
  "House price": number;
  "Cost result select": string;
  "Deposit amount": number;
  "Term length": number;
  "Annual interest": number;
};

export type HandleInputChangeParams = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  inputName: keyof MortgageCalcInputValues
) => void;

type MortgageCalculatorProps = {
  currency?: CurrencyKeys;
  housePrice?: HousePriceProps;
  costResultSelect?: CostResultSelectProps;
  depositAmount?: DepositAmountProps;
  termLength?: TermLengthProps;
  annualInterest?: AnnualInterestProps;
  children?: React.ReactNode;
};

export default function MortgageCalculator(props: MortgageCalculatorProps) {
  const currency = props.currency ?? "GBP";

  const housePriceInput = {
    name: "House price",
    type: "currency",
    label: props.housePrice?.label ?? "House price",
    defaultValue: props.housePrice?.defaultValue ?? 0,
  };

  const costResultSelectInput = {
    name: "Cost result select",
    type: "select",
    label: "Cost result",
    defaultValue: props.costResultSelect?.options?.length
      ? props.costResultSelect.options[0]
      : "Capital repayment",
    select: {
      options: props.costResultSelect?.options || [
        "Capital repayment",
        "Interest only",
      ],
    },
  };

  const depositAmountInput = {
    name: "Deposit amount",
    type: "currency",
    label: props.depositAmount?.label ?? "Deposit amount",
    defaultValue: props.depositAmount?.defaultValue ?? 0,
    range: { steps: 1, min: 0, max: Infinity },
  };

  const termLengthRangeInput = {
    name: "Term length",
    type: "percentage",
    label: props.termLength?.label ?? "Term length (years)",
    defaultValue: props.termLength?.defaultValue ?? 0,
    range: props.termLength?.range ?? {
      steps: 1,
      min: 0,
      max: 40,
    },
  };

  const annualInterestRangeInput = {
    name: "Annual interest",
    type: "percentage",
    label: props.annualInterest?.label ?? "Annual interest",
    defaultValue: props.annualInterest?.defaultValue ?? 1,
    range: props.annualInterest?.range ?? {
      steps: 0.1,
      min: 1,
      max: 20,
    },
  };

  const [inputValues, setInputValues] = useState<MortgageCalcInputValues>({
    "House price": housePriceInput.defaultValue,
    "Cost result select": costResultSelectInput.defaultValue,
    "Deposit amount": depositAmountInput.defaultValue,
    "Term length": termLengthRangeInput.defaultValue,
    "Annual interest": annualInterestRangeInput.defaultValue,
  });

  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);

  const handleCalcInput: HandleInputChangeParams = useCallback(
    (e, inputName) => {
      const key = Object.keys(inputValues).find(
        (inputState) => inputState === inputName
      );

      if (!key) return;
      const input = e.target as HTMLInputElement;

      const inputValue = input.type.includes("select")
        ? input.value
        : extractNumberFromString(input.value);

      if (typeof inputValue === "string") {
        return setInputValues({ ...inputValues, [key]: inputValue });
      }

      if (key === "House price") {
        const housePrice = inputValue;
        const depositAmount = inputValues["Deposit amount"];

        return depositAmount > housePrice
          ? setInputValues({
              ...inputValues,
              [key]: housePrice,
              "Deposit amount": housePrice,
            })
          : setInputValues({ ...inputValues, [key]: inputValue });
      }

      if (key === "Deposit amount") {
        const housePrice = inputValues["House price"];
        const depositAmount = inputValue;

        return depositAmount > housePrice
          ? setInputValues({ ...inputValues, [key]: housePrice })
          : setInputValues({ ...inputValues, [key]: inputValue });
      }

      setInputValues({ ...inputValues, [key]: inputValue });
    },
    [inputValues]
  );

  const handleCalulatorResult = () => {
    if (!Object.values(inputValues).every((value) => value && value)) return;

    const housePrice = inputValues["House price"];
    const depositAmount = inputValues["Deposit amount"];

    const loanAmount = housePrice - depositAmount;
    const termLength = inputValues["Term length"];

    const annualInterest = inputValues["Annual interest"];
    const repaymentType = inputValues["Cost result select"].toLowerCase();

    let result = 0;

    if (repaymentType === "interest only") {
      result = calculateRepayments(
        loanAmount,
        annualInterest,
        termLength,
        repaymentType
      );
    }

    if (repaymentType === "capital repayment") {
      result = calculateRepayments(
        loanAmount,
        annualInterest,
        termLength,
        repaymentType
      );
    }

    setMonthlyRepayment(result);
  };

  useEffect(handleCalulatorResult, [inputValues]);

  return (
    <Card sx={{ py: 2, px: 3 }}>
      <form id="mrc-form">
        <Stack spacing={2}>
          <Typography variant="h6">Mortgage Repayment Calculator</Typography>

          <Divider />

          <SelectInputSection
            input={costResultSelectInput}
            value={inputValues["Cost result select"]}
            handleSelectInput={handleCalcInput}
          />

          <MultilineTextField
            id="mrc-property-price"
            label="Property price"
            validation="currency"
            defaultValue={formatPrice(
              inputValues["House price"],
              "GBP",
              false,
              true
            )}
            handleUpdateFormRef={() => {}}
            textFieldProps={{
              required: false,
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              },
              sx: {
                maxWidth: "100%",
              },
            }}
          />

          <Stack direction="row" gap={2}>
            <Stack flex="auto">
              <MultilineTextField
                id="mrc-deposit"
                label="Deposit"
                validation="currency"
                defaultValue={formatPrice(
                  inputValues["Deposit amount"],
                  "GBP",
                  false,
                  true
                )}
                handleUpdateFormRef={() => {}}
                textFieldProps={{
                  required: false,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  },
                  sx: {
                    flex: "auto",
                    maxWidth: "100%",
                  },
                }}
              />

              <Typography variant="caption">
                Lenders may expect more than a 10% deposit
              </Typography>
            </Stack>

            <Box width={72} height={72}>
              <Typography>
                {housePriceInput.defaultValue &&
                  depositAmountInput.defaultValue &&
                  housePriceInput.defaultValue /
                    depositAmountInput.defaultValue}{" "}
                %
              </Typography>
            </Box>
          </Stack>

          <RangeInputSection
            input={depositAmountInput}
            dynamicMax={inputValues["House price"]}
            value={inputValues["Deposit amount"]}
            handleInputChange={handleCalcInput}
          >
            <TextInputSection
              input={depositAmountInput}
              value={formatPrice(inputValues["Deposit amount"], currency)}
              handleInputChange={handleCalcInput}
            />
          </RangeInputSection>

          <RangeInputSection
            input={termLengthRangeInput}
            value={inputValues["Term length"]}
            handleInputChange={handleCalcInput}
          >
            <TextInputSection
              input={termLengthRangeInput}
              value={inputValues["Term length"]}
              handleInputChange={handleCalcInput}
            />
          </RangeInputSection>

          <RangeInputSection
            input={annualInterestRangeInput}
            value={inputValues["Annual interest"]}
            handleInputChange={handleCalcInput}
          >
            <TextInputSection
              input={annualInterestRangeInput}
              value={inputValues["Annual interest"] + "%"}
              handleInputChange={handleCalcInput}
            />
          </RangeInputSection>
        </Stack>
      </form>

      <p>
        Monthly repayments:{" "}
        {!monthlyRepayment ? "£0" : formatPrice(monthlyRepayment, currency)}
      </p>
    </Card>
  );
}
