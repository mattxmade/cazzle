"use server";

import { PropertyListing_ } from "@/types";

export const filterProperties = async (
  searchParams: Filters,
  properties: PropertyListing_[]
) => {
  const filtered = properties.filter((propertyDoc) => {
    let match = false;

    Object.entries(searchParams).forEach((param, i) => {
      const key = param[0] as ValidParam;
      const searchValue = param[1];

      switch (key) {
        case "location":
          match = propertyDoc.town.toLowerCase() === searchValue;
          break;

        case "propertyType":
          if (!match && i !== 0) return;
          match = propertyDoc.propertyType.code === searchValue;
          break;

        case "minPrice":
          if (!match && i !== 0) return;
          match = propertyDoc.fullMarketPrice >= Number(searchValue);
          break;

        case "maxPrice":
          if (!match && i !== 0) return;

          match = propertyDoc.fullMarketPrice <= Number(searchValue);
          break;

        case "minBeds":
          if (!match && i !== 0) return;
          match = propertyDoc.bedrooms >= Number(searchValue);
          break;

        case "maxBeds":
          if (!match && i !== 0) return;
          match = propertyDoc.bedrooms <= Number(searchValue);
      }
    });
    return match && propertyDoc;
  });

  return filtered;
};

export type ValidParam =
  | "location"
  | "minPrice"
  | "maxPrice"
  | "minBeds"
  | "maxBeds"
  | "propertyType";

export type Filters = {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minBeds?: string;
  maxBeds?: string;
  propertyType?: string;
};
