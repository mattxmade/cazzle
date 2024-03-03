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
import type { UpdateDataFunction } from "../Dashboard";

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

type PropertyEditorProps = {
  propertyData: PropertyListing_;
  handleUpdateLocalData: UpdateDataFunction;
};

export type UpdateFormRefFunction = (key: string, value: any) => void;

const layout = {
  display: "grid",
  gap: 0.5,
  padding: 1,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};

const PropertyEditor = (props: PropertyEditorProps) => {
  const { propertyData, handleUpdateLocalData } = props;
  const editedData = useRef<Partial<PropertyListing_> | null>(null);

  const handleUpdateFormRef = (key: string, value: any) => {
    if (
      !Object.hasOwn(propertyData, key) ||
      typeof propertyData[key] !== typeof value
    )
      return;

    !editedData.current
      ? (editedData.current = { [key]: value })
      : (editedData.current = { ...editedData.current, [key]: value });

    editedData.current = propertyDataHelper(key as keyof PropertyDocument, {
      server: propertyData,
      client: editedData.current,
    }) as Partial<PropertyListing_>;

    editedData.current && handleUpdateLocalData("property", editedData.current);
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
              formControlProps={{ size: "small" }}
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
              formControlProps={{ size: "small" }}
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

      <Card sx={layout}>
        <Stack gap={0.5} direction="row" alignItems="center">
          <LocationOnIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Address
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <MultilineTextField
              id="propertyNumber"
              label="Property number"
              validation="number"
              defaultValue={extractNumberFromString(
                propertyData.displayAddress
              )}
              handleUpdateFormRef={handleUpdateFormRef}
            />
            <MultilineTextField
              id="street"
              label="Street"
              validation="lettersWithHyphen"
              defaultValue={propertyData.street}
              handleUpdateFormRef={handleUpdateFormRef}
            />

            <MultilineTextField
              id="town"
              label="Town"
              validation="lettersWithHyphen"
              defaultValue={propertyData.town}
              handleUpdateFormRef={handleUpdateFormRef}
            />
            <MultilineTextField
              id="postcode"
              label="Postcode"
              validation="postcode"
              defaultValue={propertyData.postcode ?? ""}
              handleUpdateFormRef={handleUpdateFormRef}
            />
          </Stack>
        </Card>
      </Card>

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
              defaultValue={formatPrice(
                propertyData.fullMarketPrice,
                "GBP",
                undefined,
                true
              )}
              textFieldProps={{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {currencies["GBP"].symbol}
                    </InputAdornment>
                  ),
                },
              }}
            />
            <MultilineTextField
              id="depositValue"
              label="Deposit value"
              validation="number"
              handleUpdateFormRef={handleUpdateFormRef}
              defaultValue={formatPrice(
                propertyData.depositValue,
                "GBP",
                undefined,
                true
              )}
              textFieldProps={{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {currencies["GBP"].symbol}
                    </InputAdornment>
                  ),
                },
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
              }}
            />

            <SelectDropdown
              id="councilTaxBand"
              label="Council tax"
              defaultValue={propertyData.councilTaxBand}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{ size: "small" }}
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
              defaultValue={propertyData.propertyType.code}
              handleUpdateFormRef={handleUpdateFormRef}
              formControlProps={{ size: "small" }}
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
            />
            <MultilineTextField
              id="bathrooms"
              label="Bathrooms"
              validation="number"
              defaultValue={propertyData.bathrooms}
              handleUpdateFormRef={handleUpdateFormRef}
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
            values={propertyData.features}
            updateFormRef={handleUpdateFormRef}
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
            textFieldProps={{ fullWidth: true, multiline: true }}
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
            defaultValue={propertyData.description.reduce(
              (prev, curr) => (prev += curr)
            )}
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ fullWidth: true, multiline: true }}
          />
        </Card>
      </Concertina>
    </Stack>
  );
};

export default PropertyEditor;
