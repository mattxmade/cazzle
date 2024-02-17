"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";

import useWindowWidth from "@/hooks/useWindowWidth";
import SearchFiltersBar from "./SearchFiltersBar";
import SearchFiltersModal from "./SearchFiltersModal";

import type { InputType } from "@/utils/validateInputs";
import type { Filters } from "@/app/(properties)/properties/page";

export type FilterInputs = {
  location: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  propertyType: string;
};

// from server
type SearchParams = Filters | null;

type SearchControllerProps = {
  queryParams: SearchParams;
  style?: React.CSSProperties;
};

const SearchController = ({ queryParams, ...props }: SearchControllerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const filterButtonText = Object.values(filterValues).filter(
    (val) => val.length
  ).length;

  const { currWidth } = useWindowWidth();

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

  const handleClearSearchForm = useCallback(() => {
    setFilterValues({
      location: "",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      propertyType: "",
    });

    router.push("/properties");
  }, [filterValues]);

  const handleCloseSearchForm = useCallback(
    () => setOpenSearchForm(false),
    [openSearchForm]
  );

  return (
    <>
      <SearchFiltersBar
        variant="bar"
        currWidth={currWidth}
        filterValues={filterValues}
        handleInputChange={handleInputChange}
      >
        <Button
          variant="outlined"
          fullWidth={false}
          onClick={() => setOpenSearchForm(true)}
          sx={{ padding: 2, textTransform: "none" }}
        >
          <Typography variant="body1">
            Filters {`(${filterButtonText})`}
          </Typography>
        </Button>
      </SearchFiltersBar>

      <SearchFiltersModal
        open={openSearchForm}
        handleClose={handleCloseSearchForm}
        handleClearSearchForm={handleClearSearchForm}
      >
        <SearchFiltersBar
          variant="modal"
          currWidth={currWidth}
          filterValues={filterValues}
          handleInputChange={handleInputChange}
          style={{ gap: 1 }}
        />
      </SearchFiltersModal>
    </>
  );
};

export default SearchController;
