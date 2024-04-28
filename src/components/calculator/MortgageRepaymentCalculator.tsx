"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
import calculateRepayments from "./calculateRepayments";

/**
 * Custom React Components
 */
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
  "Property price": number;
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
    name: "Property price",
    type: "currency",
    label: props.housePrice?.label ?? "Property price",
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
    "Property price": housePriceInput.defaultValue,
    "Cost result select": costResultSelectInput.defaultValue,
    "Deposit amount": depositAmountInput.defaultValue,
    "Term length": termLengthRangeInput.defaultValue,
    "Annual interest": annualInterestRangeInput.defaultValue,
  });

  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);

  const resultRef = useRef<HTMLParagraphElement | null>(null);
  const depositPercentage = useRef<number | null>(null);

  const handleCalcInput = useCallback(
    (id: string, value: string[] | string | number) => {
      if (typeof value !== "number" && typeof value !== "string") return;

      const inputName = id
        .slice("mrc".length)
        .replaceAll("-", " ")
        .trim()
        .toLowerCase();

      const key = Object.keys(inputValues).find(
        (inputState) => inputState.toLowerCase() === inputName
      );

      if (!key) return;

      if (typeof value === "string") {
        return setInputValues({ ...inputValues, [key]: value });
      }

      if (key === "Property price") {
        const housePrice = value;
        const depositAmount = inputValues["Deposit amount"];

        return depositAmount > housePrice
          ? setInputValues({
              ...inputValues,
              [key]: housePrice,
              "Deposit amount": housePrice,
            })
          : setInputValues({ ...inputValues, [key]: value });
      }

      if (key === "Deposit amount") {
        const housePrice = inputValues["Property price"];
        const depositAmount = value;

        return depositAmount > housePrice
          ? setInputValues({ ...inputValues, [key]: housePrice })
          : setInputValues({ ...inputValues, [key]: value });
      }

      setInputValues({ ...inputValues, [key]: value });
    },
    [inputValues]
  );

  const interval = useRef<ReturnType<typeof setInterval>>();

  const handleCalulatorResult = () => {
    if (!Object.values(inputValues).every((value) => value && value)) return;

    const housePrice = inputValues["Property price"];
    const depositAmount = inputValues["Deposit amount"];

    const loanAmount = housePrice - depositAmount;
    const termLength = inputValues["Term length"];

    const annualInterest = inputValues["Annual interest"];
    const repaymentType =
      inputValues["Cost result select"].toLowerCase() ?? "capital repayment";

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

    // Calculate deposit %
    depositPercentage.current = +(100 / (housePrice / depositAmount)).toFixed();

    // Update result state
    setMonthlyRepayment(result);

    const speed = Number(
      formatPrice(result, currency, false, true)
        .split("")
        .filter((char) => char !== ",")
        .map((char, i) => (i === 0 ? (char = "1") : "0"))
        .join("")
    );

    // textContent transition
    if (!resultRef.current) return;
    resultRef.current.textContent = "£0";

    const repayment = formatPrice(result, currency, false, false);

    if (resultRef.current.textContent !== repayment) {
      let progress = 0;

      interval.current && clearInterval(interval.current);

      interval.current = setInterval(() => {
        if (!resultRef.current || progress === result) {
          clearInterval(interval.current);
          return;
        }

        if (progress > result) {
          resultRef.current.textContent = formatPrice(
            result,
            currency,
            false,
            true
          );

          clearInterval(interval.current);
          return;
        }

        progress += speed / 20;

        resultRef.current.textContent = formatPrice(
          progress,
          currency,
          false,
          true
        );
      }, 0);
    }
  };

  useEffect(handleCalulatorResult, [inputValues]);

  return (
    <Card sx={{ pt: 2 }}>
      <Box id="mrc-form" component="form" px={3}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h6">Mortgage Repayment Calculator</Typography>

            <Divider />
          </Stack>

          {/* Property price */}
          <MultilineTextField
            id="mrc-property-price"
            label="Property price"
            validation="currency"
            defaultValue={formatPrice(
              inputValues["Property price"],
              currency,
              false,
              true
            )}
            handleUpdateFormRef={handleCalcInput}
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

          {/* Deposit amount*/}
          <Stack direction="row" gap={2}>
            <Stack flex="auto">
              <MultilineTextField
                id="mrc-deposit-amount"
                label="Deposit amount"
                validation="currency"
                defaultValue={formatPrice(
                  inputValues["Deposit amount"],
                  currency,
                  false,
                  true
                )}
                handleUpdateFormRef={handleCalcInput}
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
                {depositPercentage.current ??
                  (housePriceInput.defaultValue &&
                    depositAmountInput.defaultValue &&
                    housePriceInput.defaultValue /
                      depositAmountInput.defaultValue)}{" "}
                %
              </Typography>
            </Box>
          </Stack>

          {/* Annual Interest */}
          <MultilineTextField
            id="mrc-annual-interest"
            label="Annual interest"
            validation="number"
            defaultValue={inputValues["Annual interest"]}
            handleUpdateFormRef={handleCalcInput}
            textFieldProps={{
              required: false,
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              },
              sx: {
                maxWidth: "100%",
              },
            }}
          />

          {/* Repayment Period */}
          <MultilineTextField
            id="mrc-term-length"
            label="Repayment period"
            validation="number"
            defaultValue={inputValues["Term length"]}
            handleUpdateFormRef={handleCalcInput}
            textFieldProps={{
              required: false,
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">years</InputAdornment>
                ),
              },
              sx: {
                maxWidth: "100%",
              },
            }}
          />
        </Stack>
      </Box>

      <Stack
        mt={2}
        padding={4}
        alignItems="center"
        position="relative"
        sx={{
          outlineWidth: 1,
          outlineStyle: "solid",
          outlineColor: "lightgrey",
          backgroundColor: "#F4F4F5",
        }}
      >
        <Typography>Monthly repayments:</Typography>

        <Typography ref={resultRef} component="p" fontSize={36}>
          £0
        </Typography>
      </Stack>
    </Card>
  );
}
