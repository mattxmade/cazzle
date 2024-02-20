"use client";

import { useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { dashboard } from "@/app/content";
import { PropertyListing_ } from "@/types";
import formatPrice from "@/utils/formatPrice";

import MultilineTextField from "@/components/forms/inputs/MultilineTextField";

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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="availability-status" sx={{ fontSize: 24 }}>
            Availability
          </InputLabel>
          <Select
            autoWidth
            id="availability-status"
            label="Availability"
            value={""}
            sx={{ fontSize: 20 }}
            SelectDisplayProps={{
              style: {
                backgroundColor: "inherit",
              },
            }}
          >
            {dashboard.property.options.availabilityStatus.map((status) => (
              <MenuItem key={"status_" + status.value} value={status.value}>
                {status.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="council-tax-band" sx={{ fontSize: 24 }}>
            Council tax
          </InputLabel>
          <Select
            autoWidth
            id="council-tax-band"
            label="Council tax"
            value={""}
            sx={{ fontSize: 20 }}
            SelectDisplayProps={{
              style: {
                backgroundColor: "inherit",
              },
            }}
          >
            {dashboard.property.options.councilTaxBand.map((taxBand) => (
              <MenuItem key={"taxBand_" + taxBand.value} value={taxBand.value}>
                {taxBand.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="property-number">
            Property number
          </InputLabel>
          <Input id="property-number" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="street">
            Street
          </InputLabel>
          <Input id="street" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="town">
            Town / City
          </InputLabel>
          <Input id="town" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="postcode">
            Postcode
          </InputLabel>
          <Input id="postcode" sx={{ fontSize: 20 }} />
        </FormControl>
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="full-market-price">
            Full market price
          </InputLabel>
          <Input id="full-market-price" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="deposit-value">
            Deposit value
          </InputLabel>
          <Input id="deposit-value" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="deposit-percentage">
            Deposit percentage
          </InputLabel>
          <Input id="deposit-percentage" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="tenure" sx={{ fontSize: 24 }}>
            Tenure
          </InputLabel>
          <Select
            autoWidth
            id="tenure"
            label="Tenure"
            value={""}
            sx={{ fontSize: 20 }}
            SelectDisplayProps={{
              style: {
                // paddingBottom: 2,
                backgroundColor: "inherit",
              },
            }}
          >
            {dashboard.property.options.tenure.map((tenure) => (
              <MenuItem key={"tenure_" + tenure.value} value={tenure.value}>
                {tenure.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack gap={2} direction="row" alignItems="flex-end">
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="property-type" sx={{ fontSize: 24 }}>
            Property type
          </InputLabel>
          <Select
            autoWidth
            id="property-type"
            label="Property type"
            value={""}
            sx={{ fontSize: 20 }}
            SelectDisplayProps={{
              style: {
                backgroundColor: "inherit",
              },
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
          </Select>
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="bedrooms">
            Bedrooms
          </InputLabel>
          <Input id="bedrooms" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="bathrooms">
            Bathrooms
          </InputLabel>
          <Input id="bathrooms" sx={{ fontSize: 20 }} />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel sx={{ fontSize: 24 }} htmlFor="floorplan-area">
            Floorplan area
          </InputLabel>
          <Input id="floorplan-area" sx={{ fontSize: 20 }} />
        </FormControl>
      </Stack>

      <MultilineTextField
        label="Description"
        rows={5}
        initialText={propertyData.description.reduce(
          (prev, curr) => (prev += curr)
        )}
        handleUpdateFormRef={() => {}}
      />

      <MultilineTextField
        label="Summary"
        rows={2}
        initialText={propertyData.summary}
        handleUpdateFormRef={() => {}}
      />
    </Stack>
  );
};

export default PropertyEditor;
