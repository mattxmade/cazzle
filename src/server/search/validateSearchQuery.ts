"use server";

export const validateSearchQuery = (searchParam: string, value: string) => {
  const validParams = [
    "location",
    "minPrice",
    "maxPrice",
    "minBeds",
    "maxBeds",
    "propertyType",
  ];

  if (!validParams.includes(searchParam)) return false;

  const validParam = searchParam as SearchParam;

  switch (validParam) {
    case "location":
      return ["heywood", "pacifica", "watson", "westbrook"].includes(value);

    case "minPrice":
      return typeof Number(value) === "number";
    case "maxPrice":
      return typeof Number(value) === "number";
    case "minBeds":
      return typeof Number(value) === "number";
    case "maxBeds":
      return typeof Number(value) === "number";

    case "propertyType":
      return [
        "flat",
        "house",
        "semi-detached-house",
        "detached-house",
        "terraced-house",
        "end-of-terrace-house",
        "bungalow",
        "maisonette",
        "land",
        "park-home",
      ].includes(value);
  }
};

type SearchParam =
  | "location"
  | "minPrice"
  | "maxPrice"
  | "minBeds"
  | "maxBeds"
  | "propertyType";

type ValidPropertyType =
  | "detached"
  | "semi-detached"
  | "terraced"
  | "flat"
  | "bungalow"
  | "land"
  | "park home";
