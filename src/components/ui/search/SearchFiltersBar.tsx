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
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 110 }}>
      <InputLabel>Location</InputLabel>
      <Select
        value={filterInputs.location}
        onChange={(e) => handleInputChange(e, "location")}
        autoWidth
        label="Location"
      >
        <MenuItem aria-label="None" value=""></MenuItem>
        {content.search.filters.locations.map((location) => (
          <MenuItem value={location.value}>{location.text}</MenuItem>
        ))}
      </Select>

      <Stack direction="row" spacing={2}>
        <InputLabel>Min Price</InputLabel>
        <Select
          value={filterInputs.minPrice}
          onChange={(e) => handleInputChange(e, "minPrice")}
          autoWidth
          label="Min Price"
        >
          {content.search.filters.locations.map((location) => (
            <MenuItem value={location.value}>{location.text}</MenuItem>
          ))}
        </Select>

        <InputLabel>Max Price</InputLabel>
        <Select
          value={filterInputs.maxPrice}
          onChange={(e) => handleInputChange(e, "maxPrice")}
          autoWidth
          label="Max Price"
        >
          {content.search.filters.prices.map((price) => (
            <MenuItem value={price.value}>{price.text}</MenuItem>
          ))}
        </Select>
      </Stack>
    </FormControl>
  );
};

export default SearchFiltersBar;
