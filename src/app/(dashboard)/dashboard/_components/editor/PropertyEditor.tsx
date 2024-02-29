"use client";

import { useEffect, useRef } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { dashboard } from "@/app/content";
import { PropertyListing_ } from "@/types";
import formatPrice from "@/utils/formatPrice";

import TextFieldChipSelect from "@/components/forms/inputs/TextFieldChipSelect";
import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import SelectDropdown from "@/components/forms/inputs/SelectDropdown";
import Concertina from "@/components/ui/Concertina";

import type { UpdateDataFunction } from "../Dashboard";

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
    console.log(key, value);

    if (
      !Object.hasOwn(propertyData, key) ||
      typeof propertyData[key] !== typeof value
    )
      return;

    !editedData.current
      ? (editedData.current = { [key]: value })
      : (editedData.current = { ...editedData.current, [key]: value });

    console.log(editedData.current);
  };

  useEffect(() => {
    return () => {
      if (!editedData.current) return;
      handleUpdateLocalData("property", editedData.current);
    };
  }, []);

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
            <TextField
              required
              label="Property number"
              id="propertyNumber"
              size="small"
              defaultValue={""}
            />
            <TextField
              required
              id="street"
              label="Street"
              size="small"
              defaultValue={propertyData.street}
              inputProps={{ inputMode: "text", pattern: "^[a-zA-Z]*" }}
              onChange={(e) => handleUpdateFormRef("street", e.target.value)}
            />

            <TextField
              required
              label="Town"
              id="town"
              size="small"
              defaultValue={propertyData.town}
              onChange={(e) => handleUpdateFormRef("town", e.target.value)}
            />
            <TextField
              label="Postcode"
              id="postcode"
              size="small"
              defaultValue={propertyData.postcode}
            />
          </Stack>
        </Card>
      </Card>

      <Card sx={layout}>
        <Stack gap={0.5} direction="row" alignItems="center">
          <CalculateIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Value & Tenure
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <TextField
              required
              label="Full market price"
              id="fullMarketPrice"
              size="small"
              defaultValue={formatPrice(propertyData.fullMarketPrice, "GBP")}
            />
            <TextField
              required
              label="Deposit value"
              id="depositValue"
              size="small"
              defaultValue={formatPrice(propertyData.depositValue, "GBP")}
            />
            <TextField
              required
              label="Deposit percentage"
              id="depositPercentage"
              size="small"
              defaultValue={propertyData.depositPercentage + "%"}
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

            <TextField
              required
              label="Bedrooms"
              id="bedrooms"
              size="small"
              defaultValue={propertyData.bedrooms}
            />
            <TextField
              required
              label="Bathrooms"
              id="bathrooms"
              size="small"
              defaultValue={propertyData.bathrooms}
            />
            <TextField
              required
              label="Floorplan area"
              id="floorArea"
              size="small"
              defaultValue={propertyData.floorArea + "0" + " SqM"}
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
            defaultValue={propertyData.summary}
            handleUpdateFormRef={handleUpdateFormRef}
            formControlProps={{ sx: { margin: 0 } }}
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
            defaultValue={propertyData.description.reduce(
              (prev, curr) => (prev += curr)
            )}
            handleUpdateFormRef={handleUpdateFormRef}
            formControlProps={{ sx: { margin: 0 } }}
          />
        </Card>
      </Concertina>
    </Stack>
  );
};

export default PropertyEditor;
