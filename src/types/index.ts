import { Id } from "@/../convex/_generated/dataModel";

type EnviromentRating = "A" | "B" | "C" | "D" | "E" | "F" | null;

export type PropertyType = {
  group: "House" | "Flat";
  code:
    | "flat"
    | "semi-detached-house"
    | "detached-house"
    | "terraced-house"
    | "end-of-terrace-house"
    | "bungalow"
    | "maisonette"
    | "studio"
    | "house";
  name:
    | "Flat"
    | "Semi-detached house"
    | "Detached house"
    | "Terraced house"
    | "End-of-terrace house"
    | "Bungalow"
    | "Maisonette"
    | "Studio"
    | "House";
};

type CouncilTaxBand = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type Other =
  | "wheelchair-accessible"
  | "pets-allowed"
  | "central-heating"
  | "double-glazing"
  | "lift-access";

export type AgentDetails = {
  agent_id: string;
  name: string;
  role: string;
  user_id: string;
};

export type AgentProperty = {
  address: string;
  bathrooms: number;
  bedrooms: number;
  name: string;
  price: string;
  property_id: string;
  type: PropertyType;
  user_id: string;
};

export type MediaData = {
  mediaData: { src: string | null; alt?: string; type?: string }[];
};

export type StorageId = {
  storageId: Id<"_storage"> | null;
};

export type PropertyListing_ = {
  _id: Id<"properties">;
  _creationTime: number;
  [index: string]: any;
  availabilityStatus: "available" | "closed" | "coming-soon" | "under-offer";
  bathrooms: number;
  bedrooms: number;
  councilTaxBand: CouncilTaxBand;
  creationDate: number;
  depositPercentage: number;
  depositValue: number;
  description: string[];
  displayAddress: string;
  environmentRating: EnviromentRating;
  features: string[];
  floorArea: number;
  floorplanImages: { storageId: string }[];
  forSale: boolean;
  fullMarketPrice: number;
  galleryImages: { storageId: Id<"_storage"> }[] | [];
  modifiedDate: number;
  name: string;
  newBuild: boolean;
  postcode: string | null;
  propertyType: PropertyType;
  property_id: string;
  slug: string;
  street: string;
  summary: string;
  tenure: string;
  town: string;
};
