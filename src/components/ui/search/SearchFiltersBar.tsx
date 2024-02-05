"use client";

import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { content } from "@/app/content";

const SearchFiltersBar = () => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (e: SelectChangeEvent) => {
    const select = e.target as HTMLSelectElement;
    setLocation(select.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 110 }}>
      <InputLabel>Location</InputLabel>
      <Select
        value={location}
        onChange={handleLocationChange}
        autoWidth
        label="Location"
      >
        <MenuItem aria-label="None" value=""></MenuItem>
        {content.search.filters.locations.map((location) => (
          <MenuItem value={location.value}>{location.text}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchFiltersBar;
