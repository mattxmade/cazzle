"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { content } from "@/app/content";
import validFilterInput, { type InputType } from "@/utils/validateInputs";

const SearchFiltersBar = () => {
  const [filterInputs, setFilterInputs] = useState({
    location: "",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    minBeds: "Min Beds",
    maxBeds: "Max Beds",
    propertyType: "",
  });

  const handleInputChange = (e: SelectChangeEvent, type: InputType) => {
    const select = e.target as HTMLSelectElement;

    if (!validFilterInput(type, select.value)) return;
    setFilterInputs((prev) => ({ ...prev, [type]: select.value }));
  };

  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={filterInputs.location}
          onChange={(e) => handleInputChange(e, "location")}
          autoWidth
          label="Location"
        >
          <MenuItem aria-label="None" value=""></MenuItem>
          {content.search.filters.locations.map((location) => (
            <MenuItem key={"location_" + location.value} value={location.value}>
              {location.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <InputLabel>MinPrice</InputLabel>
          <Select
            value={filterInputs.minPrice}
            onChange={(e) => handleInputChange(e, "minPrice")}
            autoWidth
            label="MinPrice"
          >
            {content.search.filters.prices.map((price) => (
              <MenuItem key={"minPrice_" + price.value} value={price.value}>
                {price.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <InputLabel>MaxPrice</InputLabel>
          <Select
            value={filterInputs.maxPrice}
            onChange={(e) => handleInputChange(e, "maxPrice")}
            autoWidth
            label="MaxPrice"
          >
            {content.search.filters.prices.map((price) => (
              <MenuItem key={"maxPrice_" + price.value} value={price.value}>
                {price.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <InputLabel>MinBeds</InputLabel>
          <Select
            value={filterInputs.minBeds}
            onChange={(e) => handleInputChange(e, "minBeds")}
            autoWidth
            label="MinBeds"
          >
            {content.search.filters.bedrooms.map((beds) => (
              <MenuItem key={"minBeds_" + beds.value} value={beds.value}>
                {beds.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <InputLabel>MaxBeds</InputLabel>
          <Select
            value={filterInputs.maxBeds}
            onChange={(e) => handleInputChange(e, "maxBeds")}
            autoWidth
            label="MaxBeds"
          >
            {content.search.filters.bedrooms.map((beds) => (
              <MenuItem key={"maxBeds_" + beds.value} value={beds.value}>
                {beds.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <FormControl sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Property Type</InputLabel>
        <Select
          value={filterInputs.propertyType}
          onChange={(e) => handleInputChange(e, "propertyType")}
          autoWidth
          label="Property Type"
        >
          {content.search.filters.propertyType.map((type) => (
            <MenuItem key={"propertyType_" + type.value} value={type.value}>
              {type.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchFiltersBar;
