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

import useWindowWidth from "@/hooks/useWindowWidth";
import SearchFiltersModal from "./SearchFiltersModal";

import type { InputType } from "@/utils/validateInputs";
import type { Filters } from "@/app/(properties)/properties/page";
import { content } from "@/app/content";

export type FilterInputs = {
  location: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  propertyType: string;
};

// from server
type SearchParams = {
  variant?: "bar" | "modal";
  queryParams: Filters | null;
};

const SearchFiltersBar = ({ queryParams, ...props }: SearchParams) => {
  const variant = props.variant ?? "bar";

  const router = useRouter();
  const searchParams = useSearchParams();

  const { currWidth } = useWindowWidth();
  const [openSearchForm, setOpenSearchForm] = useState(false);

  const getFilterValues = () => {
    return {
      location: searchParams.get("location") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
      minBeds: searchParams.get("minBeds") ?? "",
      maxBeds: searchParams.get("maxBeds") ?? "",
      propertyType: searchParams.get("propertyType") ?? "",
    };
  };

  const [filterValues, setFilterValues] = useState({ ...getFilterValues() });

  let filterLabelText = "";

  if (currWidth > 1200) filterLabelText = "";
  if (currWidth <= 1200) filterLabelText = "1";
  if (currWidth <= 1024) filterLabelText = "2";
  if (currWidth <= 768) filterLabelText = "3";

  const handleInputChange = (e: SelectChangeEvent, type: InputType) => {
    const select = e.target as HTMLSelectElement;

    handleSearchQuery({ ...filterValues, [type]: select.value });
    setFilterValues((prev) => ({ ...prev, [type]: select.value }));
  };

  const handleSearchQuery = (values: typeof filterValues) => {
    let searchQuery = "";

    Object.entries(values).forEach((filter) => {
      const [key, value] = filter;
      if (!value) return;

      searchQuery === ""
        ? (searchQuery += `?${key}=${value}`)
        : (searchQuery += `&${key}=${value}`);
    });

    searchQuery.length ? router.push(searchQuery) : router.push("/properties");
  };

  useEffect(() => {
    setFilterValues({ ...getFilterValues() });
  }, [queryParams]);

  const handleCloseSearchForm = useCallback(
    () => setOpenSearchForm(false),
    [openSearchForm]
  );

  return (
    <>
      {variant === "bar" ? (
        <SearchFiltersModal
          open={openSearchForm}
          handleClose={handleCloseSearchForm}
        >
          <SearchFiltersBar queryParams={queryParams} variant="modal" />
        </SearchFiltersModal>
      ) : null}

      <Stack
        component="form"
        direction={variant === "bar" ? "row" : "column"}
        alignItems="center"
        justifyContent="space-around"
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

        {currWidth < 1200 && variant === "bar" ? (
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
