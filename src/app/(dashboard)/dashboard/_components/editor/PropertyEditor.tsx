"use client";

import { useRef, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import HomeIcon from "@mui/icons-material/Home";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import CalculateIcon from "@mui/icons-material/Calculate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { dashboard } from "@/app/content";
import { PropertyListing_ } from "@/types";
import formatPrice from "@/utils/formatPrice";

import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import SelectDropdown from "@/components/forms/inputs/SelectDropdown";
import Concertina from "@/components/ui/Concertina";

type PropertyEditorProps = {
  propertyData: PropertyListing_;
};

const PropertyEditor = ({ propertyData }: PropertyEditorProps) => {
  const desc = useRef(
    propertyData.description.reduce((prev, curr) => (prev += curr))
  );

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const layout = {
    display: "grid",
    gap: 0.5,
    padding: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  return (
    <Stack gap={2}>
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
          formControlProps={{ size: "small" }}
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
          formControlProps={{ size: "small" }}
        >
          {dashboard.property.options.councilTaxBand.map((taxBand) => (
            <MenuItem key={"taxBand_" + taxBand.value} value={taxBand.value}>
              {taxBand.text}
            </MenuItem>
          ))}
        </SelectDropdown>
      </Stack>

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
              id="property-number"
              size="small"
            />
            <TextField required label="Street" id="street" size="small" />

            <TextField required label="Town" id="town" size="small" />
            <TextField label="Postcode" id="postcode" size="small" />
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
              id="full-market-price"
              size="small"
            />
            <TextField
              required
              label="Deposit value"
              id="deposit value"
              size="small"
            />
            <TextField
              required
              label="Deposit percentage"
              id="deposit-percentage"
              size="small"
            />

            <SelectDropdown
              id="tenure"
              label="Tenure"
              handleUpdateFormRef={() => {}}
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
          <HomeIcon color="primary" />
          <Typography variant="h6" color="darkslategrey">
            Details
          </Typography>
        </Stack>

        <Card sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Stack gap={2} direction="row" alignItems="flex-end">
            <SelectDropdown
              id="property-type"
              label="Property type"
              handleUpdateFormRef={() => {}}
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

            <TextField required label="Bedrooms" id="bedrooms" size="small" />
            <TextField required label="Bathrooms" id="bathrooms" size="small" />
            <TextField
              required
              label="Floorplan area"
              id="floorplan-area"
              size="small"
            />
          </Stack>
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
            label="Summary"
            defaultValue={propertyData.summary}
            handleUpdateFormRef={() => {}}
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
            label="Description"
            defaultValue={propertyData.description.reduce(
              (prev, curr) => (prev += curr)
            )}
            handleUpdateFormRef={() => {}}
            formControlProps={{ sx: { margin: 0 } }}
          />
        </Card>
      </Concertina>
    </Stack>
  );
};

export default PropertyEditor;
