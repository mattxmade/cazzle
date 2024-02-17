"use client";

import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";

import useWindowWidth from "@/hooks/useWindowWidth";

import type { InputType } from "@/utils/validateInputs";
import { content } from "@/app/content";

export type FilterInputs = {
  location: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  propertyType: string;
};

type SearchFilterBarProps = {
  variant?: "bar" | "modal";
  currWidth: number;
  filterValues: FilterInputs;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  handleInputChange: (e: SelectChangeEvent, type: InputType) => void;
};

const SearchFiltersBar = (props: SearchFilterBarProps) => {
  const variant = props.variant ?? "bar";
  const { filterValues, currWidth, handleInputChange } = props;

  return (
    <>
      <Stack
        component="form"
        direction={variant === "bar" ? "row" : "column"}
        alignItems="center"
        justifyContent="space-around"
        sx={props.style ?? {}}
      >
        <FormControl sx={{ m: 1, minWidth: 125 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={filterValues.location}
            onChange={(e) => handleInputChange(e, "location")}
            autoWidth
            label="Location"
          >
            {content.search.filters.locations.map((location) => (
              <MenuItem
                key={"location_" + location.value}
                value={location.value}
              >
                {location.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currWidth >= 768 || variant === "modal" ? (
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>MinPrice</InputLabel>
              <Select
                autoWidth
                value={filterValues.minPrice}
                onChange={(e) => handleInputChange(e, "minPrice")}
                label="Min Price"
              >
                <MenuItem value="">Min Price</MenuItem>
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
                autoWidth
                value={filterValues.maxPrice}
                onChange={(e) => handleInputChange(e, "maxPrice")}
                label="Max Price"
              >
                <MenuItem value="">Max Price</MenuItem>
                {content.search.filters.prices.map((price) => (
                  <MenuItem key={"maxPrice_" + price.value} value={price.value}>
                    {price.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null}

        {currWidth >= 1024 || variant === "modal" ? (
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>MinBeds</InputLabel>
              <Select
                autoWidth
                value={filterValues.minBeds}
                onChange={(e) => handleInputChange(e, "minBeds")}
                label="Min Beds"
              >
                <MenuItem value="">Min Beds</MenuItem>
                {content.search.filters.bedrooms.map((beds) => (
                  <MenuItem key={"minBeds_" + beds.value} value={beds.value}>
                    {beds.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>Max Beds</InputLabel>
              <Select
                autoWidth
                value={filterValues.maxBeds}
                onChange={(e) => handleInputChange(e, "maxBeds")}
                label="Max Beds"
              >
                <MenuItem value="">Max Beds</MenuItem>
                {content.search.filters.bedrooms.map((beds) => (
                  <MenuItem key={"maxBeds_" + beds.value} value={beds.value}>
                    {beds.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null}

        {currWidth >= 1200 || variant === "modal" ? (
          <FormControl sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Property Type</InputLabel>
            <Select
              autoWidth
              value={filterValues.propertyType}
              onChange={(e) => handleInputChange(e, "propertyType")}
              label="Property Type"
            >
              {content.search.filters.propertyType.map((type) => (
                <MenuItem key={"propertyType_" + type.value} value={type.value}>
                  {type.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}

        {currWidth < 1200 && variant === "bar" ? props.children : null}
      </Stack>
    </>
  );
};

export default SearchFiltersBar;
