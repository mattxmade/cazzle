"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";

import SearchFiltersModal from "./SearchFiltersModal";

import { content } from "@/app/content";
import useWindowWidth from "@/hooks/useWindowWidth";
import validFilterInput, { type InputType } from "@/utils/validateInputs";

export type FilterInputs = {
  location: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  propertyType: string;
};

const SearchFiltersBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { currWidth } = useWindowWidth();
  const [openSearchForm, setOpenSearchForm] = useState(false);

  const [filterInputs, setFilterInputs] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    propertyType: "",
  });

  let filterLabelText = "";

  if (currWidth > 1200) filterLabelText = "";
  if (currWidth <= 1200) filterLabelText = "1";
  if (currWidth <= 1024) filterLabelText = "2";
  if (currWidth <= 768) filterLabelText = "3";

  const handleInputChange = (e: SelectChangeEvent, type: InputType) => {
    const select = e.target as HTMLSelectElement;

    if (!validFilterInput(type, select.value)) return;
    setFilterInputs((prev) => ({ ...prev, [type]: select.value }));
  };

  const handleSearchQuery = () => {
    let searchQuery = "?";
    const inputs = Object.entries(filterInputs);

    inputs.forEach((input, i) => {
      const [key, value] = input;

      if (value !== "") {
        searchQuery += `${key}=${value}&`;
      }
    });

    searchQuery = searchQuery.slice(0, -1);
    searchQuery ? router.replace(searchQuery) : router.replace("/properties");
  };

  const handleCloseSearchForm = useCallback(
    () => setOpenSearchForm(false),
    [openSearchForm]
  );

  useEffect(() => {
    handleSearchQuery();
  }, [filterInputs]);

  useEffect(() => {
    // TODO: validate inputs if query changed in address bar
  }, [searchParams]);

  return (
    <>
      <SearchFiltersModal
        open={openSearchForm}
        handleClose={handleCloseSearchForm}
      />

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
              <MenuItem
                key={"location_" + location.value}
                value={location.value}
              >
                {location.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currWidth >= 768 ? (
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>MinPrice</InputLabel>
              <Select
                autoWidth
                value={filterInputs.minPrice}
                onChange={(e) => handleInputChange(e, "minPrice")}
                label="Min Price"
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
                autoWidth
                value={filterInputs.maxPrice}
                onChange={(e) => handleInputChange(e, "maxPrice")}
                label="Max Price"
              >
                {content.search.filters.prices.map((price) => (
                  <MenuItem key={"maxPrice_" + price.value} value={price.value}>
                    {price.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null}

        {currWidth >= 1024 ? (
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>MinBeds</InputLabel>
              <Select
                autoWidth
                value={filterInputs.minBeds}
                onChange={(e) => handleInputChange(e, "minBeds")}
                label="Min Beds"
              >
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
                value={filterInputs.maxBeds}
                onChange={(e) => handleInputChange(e, "maxBeds")}
                label="Max Beds"
              >
                {content.search.filters.bedrooms.map((beds) => (
                  <MenuItem key={"maxBeds_" + beds.value} value={beds.value}>
                    {beds.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null}

        {currWidth >= 1200 ? (
          <FormControl sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Property Type</InputLabel>
            <Select
              autoWidth
              value={filterInputs.propertyType}
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

        {currWidth <= 1200 ? (
          <Button
            variant="outlined"
            fullWidth={false}
            onClick={() => setOpenSearchForm(true)}
            sx={{ padding: 2, textTransform: "none" }}
          >
            <Typography variant="body1">
              Filters {`(${filterLabelText})`}
            </Typography>
          </Button>
        ) : null}
      </Stack>
    </>
  );
};

export default SearchFiltersBar;
