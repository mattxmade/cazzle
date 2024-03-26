"use client";

import { useRef } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { dashboard } from "@/app/content";
import type { PropertyListing_ } from "@/types";
import type { PropertyErrors, FormDataFunction } from "../Dashboard";

import currencies from "@/utils/currencies";
import formatPrice from "@/utils/formatPrice";
import extractNumberFromString from "@/utils/extractNumberFromString";
import {
  type PropertyDocument,
  propertyDataHelper,
} from "@/helpers/dataHelper";

import TextFieldChipSelect from "@/components/forms/inputs/TextFieldChipSelect";
import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import SelectDropdown from "@/components/forms/inputs/SelectDropdown";
import Concertina from "@/components/ui/Concertina";
import FormCard from "@/components/forms/FormCard";
import FormSection from "@/components/forms/FormSection";

type PropertyFormProps = {
  newForm?: boolean;
  formErrors: PropertyErrors | null;
  propertyData: PropertyListing_;
  handleUpdateLocalData: FormDataFunction;
};

export type UpdateFormRefFunction = (key: string, value: any) => void;

const layout = {
  display: "grid",
  gap: 0.5,
  padding: 1,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};

const PropertyForm = (props: PropertyFormProps) => {
  const { propertyData, handleUpdateLocalData } = props;
  const formData = useRef<Partial<PropertyListing_> | null>(null);

  const handleUpdateFormRef = (key: string, value: any) => {
    if (!props.newForm && !Object.hasOwn(propertyData, key)) return;

    !formData.current
      ? (formData.current = { [key]: value })
      : (formData.current = { ...formData.current, [key]: value });

    formData.current = propertyDataHelper(key as keyof PropertyDocument, {
      server: propertyData,
      client: formData.current,
    }) as Partial<PropertyListing_>;

    formData.current && handleUpdateLocalData("property", formData.current);
  };

  return (
    <Stack gap={2}>
      <Card sx={layout}>
        <Stack gap={0.5} direction="row" alignItems="center">
          <LocalOfferIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Offer type
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <FormControl sx={{ width: 210, height: 40 }} variant="outlined">
              <Stack
                gap={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "inherit",
                  padding: "0 12px",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  fontSize={16}
                  color="rgba(0, 0, 0, 0.8)"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  For sale
                </Typography>

                <Checkbox
                  defaultChecked={propertyData.forSale}
                  onChange={(e) =>
                    handleUpdateFormRef("forSale", e.target.checked)
                  }
                  sx={{ padding: 0, "& .MuiSvgIcon-root": { fontSize: 26 } }}
                />
              </Stack>
            </FormControl>

            <FormControl sx={{ width: 210, height: 40 }} variant="outlined">
              <Stack
                gap={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "inherit",
                  padding: "0 12px",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  fontSize={16}
                  color="rgba(0, 0, 0, 0.8)"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  New build
                </Typography>

                <Checkbox
                  defaultChecked={propertyData.newBuild}
                  onChange={(e) =>
                    handleUpdateFormRef("newBuild", e.target.checked)
                  }
                  sx={{ padding: 0, "& .MuiSvgIcon-root": { fontSize: 26 } }}
                />
              </Stack>
            </FormControl>

            <SelectDropdown
              id="availabilityStatus"
              label="Availability"
              defaultValue={propertyData.availabilityStatus}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{
                size: "small",
                error: props.formErrors?.availabilityStatus ? true : false,
              }}
            >
              {dashboard.property.options.availabilityStatus.map((status) => (
                <MenuItem key={"status_" + status.value} value={status.value}>
                  {status.text}
                </MenuItem>
              ))}
            </SelectDropdown>

            <SelectDropdown
              id="tenure"
              label="Tenure"
              defaultValue={propertyData.tenure}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{
                size: "small",
                error: props.formErrors?.tenure ? true : false,
              }}
            >
              {dashboard.property.options.tenure.map((tenure) => (
                <MenuItem key={"tenure_" + tenure.value} value={tenure.value}>
                  {tenure.text}
                </MenuItem>
              ))}
            </SelectDropdown>
          </Stack>
        </Card>
      </Card>

      <FormCard>
        <FormSection
          heading="Address"
          Icon={<LocationOnIcon color="primary" />}
        >
          <MultilineTextField
            id="propertyNumber"
            label="Property number"
            validation="number"
            defaultValue={
              propertyData.displayAddress
                ? extractNumberFromString(propertyData.displayAddress)
                : ""
            }
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              error: props.formErrors?.propertyNumber ? true : false,
              helperText: props.formErrors?.propertyNumber ?? "",
            }}
          />
          <MultilineTextField
            id="street"
            label="Street"
            validation="lettersWithHyphen"
            defaultValue={propertyData.street}
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              error: props.formErrors?.street ? true : false,
              helperText: props.formErrors?.street ?? "",
            }}
          />

          <MultilineTextField
            id="town"
            label="Town"
            validation="lettersWithHyphen"
            defaultValue={propertyData.town}
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              error: props.formErrors?.town ? true : false,
              helperText: props.formErrors?.town ?? "",
            }}
          />
          <MultilineTextField
            id="postcode"
            label="Postcode"
            validation="postcode"
            defaultValue={propertyData.postcode ?? ""}
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              error: props.formErrors?.postcode ? true : false,
              helperText: props.formErrors?.postcode ?? "",
            }}
          />
        </FormSection>
      </FormCard>

      <Card sx={layout}>
        <Stack gap={0.5} direction="row" alignItems="center">
          <CalculateIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Value
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <MultilineTextField
              id="fullMarketPrice"
              label="Full market price"
              validation="currency"
              handleUpdateFormRef={handleUpdateFormRef}
              defaultValue={
                propertyData.fullMarketPrice
                  ? formatPrice(
                      propertyData.fullMarketPrice,
                      "GBP",
                      undefined,
                      true
                    )
                  : ""
              }
              textFieldProps={{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {currencies["GBP"].symbol}
                    </InputAdornment>
                  ),
                },

                error: props.formErrors?.fullMarketPrice ? true : false,
                helperText: props.formErrors?.fullMarketPrice ?? "",
              }}
            />
            <MultilineTextField
              id="depositValue"
              label="Deposit value"
              validation="currency"
              handleUpdateFormRef={handleUpdateFormRef}
              defaultValue={
                propertyData.depositValue
                  ? formatPrice(
                      propertyData.depositValue,
                      "GBP",
                      undefined,
                      true
                    )
                  : ""
              }
              textFieldProps={{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {currencies["GBP"].symbol}
                    </InputAdornment>
                  ),
                },

                error: props.formErrors?.depositValue ? true : false,
                helperText: props.formErrors?.depositValue ?? "",
              }}
            />
            <MultilineTextField
              id="depositPercentage"
              validation="number"
              label="Deposit percentage"
              defaultValue={propertyData.depositPercentage}
              handleUpdateFormRef={handleUpdateFormRef}
              textFieldProps={{
                inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                },

                error: props.formErrors?.depositPercentage ? true : false,
                helperText: props.formErrors?.depositPercentage ?? "",
              }}
            />

            <SelectDropdown
              id="councilTaxBand"
              label="Council tax"
              defaultValue={propertyData.councilTaxBand}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{
                size: "small",
                error: props.formErrors?.councilTaxBand ? true : false,
              }}
            >
              {dashboard.property.options.councilTaxBand.map((taxBand) => (
                <MenuItem
                  key={"taxBand_" + taxBand.value}
                  value={taxBand.value}
                >
                  {taxBand.text}
                </MenuItem>
              ))}
            </SelectDropdown>
          </Stack>
        </Card>
      </Card>

      <Card sx={layout}>
        <Stack gap={0.5} direction="row" alignItems="center">
          <HomeIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Details
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <SelectDropdown
              id="propertyType"
              label="Property type"
              defaultValue={propertyData?.propertyType?.code ?? ""}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{
                size: "small",
                error: props.formErrors?.propertyType ? true : false,
              }}
            >
              {dashboard.property.options.propertyType.map((propertyType) => (
                <MenuItem
                  key={"propertyType_" + propertyType.value}
                  value={propertyType.value}
                >
                  {propertyType.text}
                </MenuItem>
              ))}
            </SelectDropdown>
            <MultilineTextField
              id="bedrooms"
              label="Bedrooms"
              validation="number"
              defaultValue={propertyData.bedrooms}
              handleUpdateFormRef={handleUpdateFormRef}
              textFieldProps={{
                error: props.formErrors?.bedrooms ? true : false,
                helperText: props.formErrors?.bedrooms ?? "",
              }}
            />
            <MultilineTextField
              id="bathrooms"
              label="Bathrooms"
              validation="number"
              defaultValue={propertyData.bathrooms}
              handleUpdateFormRef={handleUpdateFormRef}
              textFieldProps={{
                error: props.formErrors?.bathrooms ? true : false,
                helperText: props.formErrors?.bathrooms ?? "",
              }}
            />
            <MultilineTextField
              id="floorArea"
              label="Floorplan area"
              validation="number"
              defaultValue={propertyData.floorArea}
              handleUpdateFormRef={handleUpdateFormRef}
              textFieldProps={{
                inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">m²</InputAdornment>
                  ),
                },

                error: props.formErrors?.floorArea ? true : false,
                helperText: props.formErrors?.floorArea ?? "",
              }}
            />
          </Stack>
        </Card>

        <Card
          sx={{
            gap: 4,
            display: "flex",
            padding: 2,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <TextFieldChipSelect
            id="features"
            label="feature"
            values={propertyData.features ?? []}
            updateFormRef={handleUpdateFormRef}
            textFieldProps={{
              error: props.formErrors?.features ? true : false,
              helperText: props.formErrors?.features,
            }}
          />
        </Card>
      </Card>

      <Concertina
        muiProps={{
          accordionProps: { sx: { ...layout } },
          accordionSummaryProps: {
            id: "summary-header",
            "aria-controls": "summary-content",
          },
        }}
        summaryContent={
          <Stack gap={0.5} direction="row" alignItems="center">
            <TextFieldsIcon color="primary" />
            <Typography variant="h6" color="darkslategrey">
              Summary
            </Typography>
          </Stack>
        }
      >
        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <MultilineTextField
            id="summary"
            label="Summary"
            validation="singleline"
            defaultValue={propertyData.summary}
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              fullWidth: true,
              multiline: true,
              error: props.formErrors?.summary ? true : false,
              helperText: props.formErrors?.summary ?? "",
            }}
          />
        </Card>
      </Concertina>

      <Concertina
        muiProps={{
          accordionProps: { sx: { ...layout } },
          accordionSummaryProps: {
            id: "description-header",
            "aria-controls": "description-content",
          },
        }}
        summaryContent={
          <Stack gap={0.5} direction="row" alignItems="center">
            <TextFieldsIcon color="primary" />
            <Typography variant="h6" color="darkslategrey">
              Description
            </Typography>
          </Stack>
        }
      >
        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <MultilineTextField
            id="description"
            label="Description"
            validation="multiline"
            defaultValue={
              propertyData?.description?.reduce(
                (prev, curr) => (prev += curr)
              ) ?? ""
            }
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{
              fullWidth: true,
              multiline: true,
              error: props.formErrors?.description ? true : false,
              helperText: props.formErrors?.description ?? "",
            }}
          />
        </Card>
      </Concertina>
    </Stack>
  );
};

export default PropertyForm;
