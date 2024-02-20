"use client";

import { useRef } from "react";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { dashboard } from "@/app/content";
import { PropertyListing_ } from "@/types";
import formatPrice from "@/utils/formatPrice";

import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import SelectDropdown from "@/components/forms/inputs/SelectDropdown";

type PropertyEditorProps = {
  propertyData: PropertyListing_;
};

const PropertyEditor = ({ propertyData }: PropertyEditorProps) => {
  const desc = useRef(
    propertyData.description.reduce((prev, curr) => (prev += curr))
  );

  return (
    <Stack>
      <Stack gap={2} direction="row" alignItems="flex-end">
        <FormControl sx={{ width: 210 }} variant="outlined">
          <Stack gap={2} direction="row" position="relative" sx={{ top: 2 }}>
            <Typography
              fontSize={24}
              color="rgba(0, 0, 0, 0.6)"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              For sale
            </Typography>

            <Checkbox
              checked={propertyData.forSale}
              sx={{ padding: 0, "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Stack>
          <Divider
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              ":hover": {
                backgroundColor: "black",
              },
            }}
          />
        </FormControl>

        <FormControl sx={{ width: 210 }} variant="outlined">
          <Stack gap={2} direction="row" position="relative" sx={{ top: 2 }}>
            <Typography
              fontSize={24}
              color="rgba(0, 0, 0, 0.6)"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              New build
            </Typography>

            <Checkbox
              checked={propertyData.newBuild}
              sx={{ padding: 0, "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Stack>
          <Divider
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              ":hover": {
                backgroundColor: "black",
              },
            }}
          />
        </FormControl>

        <SelectDropdown
          id="availability-status"
          label="Availability"
          handleUpdateFormRef={() => {}}
        >
          {dashboard.property.options.availabilityStatus.map((status) => (
            <MenuItem key={"status_" + status.value} value={status.value}>
              {status.text}
            </MenuItem>
          ))}
        </SelectDropdown>

        <SelectDropdown
          id="council-tax-band"
          label="Council tax"
          handleUpdateFormRef={() => {}}
        >
          {dashboard.property.options.councilTaxBand.map((taxBand) => (
            <MenuItem key={"taxBand_" + taxBand.value} value={taxBand.value}>
              {taxBand.text}
            </MenuItem>
          ))}
        </SelectDropdown>
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <TextField label="Property number" id="property-number" />
        <TextField label="Street" id="street" />

        <TextField label="Town" id="town" />
        <TextField label="Postcode" id="postcode" />
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <TextField label="Full market price" id="full-market-price" />
        <TextField label="Deposit value" id="deposit value" />
        <TextField label="Deposit percentage" id="deposit-percentage" />

        <SelectDropdown
          id="tenure"
          label="Tenure"
          handleUpdateFormRef={() => {}}
        >
          {dashboard.property.options.tenure.map((tenure) => (
            <MenuItem key={"tenure_" + tenure.value} value={tenure.value}>
              {tenure.text}
            </MenuItem>
          ))}
        </SelectDropdown>
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <SelectDropdown
          id="property-type"
          label="Property type"
          handleUpdateFormRef={() => {}}
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

        <TextField label="Bedrooms" id="bedrooms" />
        <TextField label="Bathrooms" id="bathrooms" />
        <TextField label="Floorplan area" id="floorplan-area" />
      </Stack>

      <MultilineTextField
        label="Description"
        rows={5}
        defaultValue={propertyData.description.reduce(
          (prev, curr) => (prev += curr)
        )}
        handleUpdateFormRef={() => {}}
        formControlProps={{ sx: { margin: 0 } }}
      />

      <MultilineTextField
        label="Summary"
        rows={2}
        defaultValue={propertyData.summary}
        handleUpdateFormRef={() => {}}
        formControlProps={{ sx: { margin: 0 } }}
      />
    </Stack>
  );
};

export default PropertyEditor;
