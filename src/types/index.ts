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

type EstateAgentDetails = {
  id: string;
  name: string;
  linkToPage: string;
  contact: { phone: number; email: string; address: string };
  content: {
    logo: string;
    banner: string;
    about: {
      heading: string;
      sunheading: string | null;
      description: string;
    };
  };
};

// 1024px x 683px
// Carousel is an article
// Similar properies is an article

export type Other =
  | "wheelchair-accessible"
  | "pets-allowed"
  | "central-heating"
  | "double-glazing"
  | "lift-access";

// SEARCH PARAMS
// https://keaze.com/search?location=Kent&type=for-sale&radius=20&bedrooms=2

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

type ConvexDocumentMetadata = {
  _id: string; // Id<"">
  _creationTime: number;
};

export type MediaData = {
  mediaData: { src: string | null; alt?: string; type?: string }[];
};

export type StorageId = {
  storageId: Id<"_storage"> | null;
};

export type LiveProperty_ = {
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
  galleryImages: { storageId: Id<"_storage"> }[] | []; // { storageId: Id<"_storage"> | null }[] | [];
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
  user_id: string;
  draft?: boolean;
};

export type NewPropertyDocument = LiveProperty_;
export type PropertyListing_ = LiveProperty_ & {
  _id: Id<"properties">;
  _creationTime: number;
};

// Property Generator
export type LiveProperty = {
  availabilityStatus: "available" | "closed" | "coming-soon" | "under-offer";
  bedrooms: number;
  bathrooms: number;
  councilTaxBand: CouncilTaxBand;
  depositPercentage: number;
  depositValue: number;
  description: string[];
  displayAddress: string;
  environmentRating: "A" | "B";
  features: string[] | []; // change to array of strings like rightmove
  floorArea: number | null;
  forSale: boolean; // CHECK
  floorplanImages: { src: string; alt: string; slug: string }[] | [];
  fullMarketPrice: number;
  galleryImages: { src: string; alt: string; slug: string }[] | [];
  name: string;
  newBuild: boolean;
  postcode: string | null; // DEL as postcodes wont exsist in fictional places
  propertyType: PropertyType;
  slug: string;
  street: string;
  summary: string;
  tenure: Tenure;
  town: string;
  // Adds => check rightmove
  creationDate?: number;
  modifiedDate?: number;
  property_id: string;
};

export type AddProperty = {
  basic: BaiscInfo;
  address?: Address | null;
  propertyDetails: PropertyDetails_;
  price: Price;
  description: string;
};

type Tenure = "leasehold" | "freehold" | "commonhold";
type FurnitureStatus = "unfurnished" | "part-furnished" | "furnished";

type BaiscInfo = {
  forSale: boolean;
  newBuild: boolean;
  handoverDate: string;
  propertyNumber: number;
  propertyType: PropertyType;
  availabilityStatus: AvailabilityStatus;
};

type Address = {
  postcode: string;
  street: string;
  townCity: string;
};

type PropertyDetails_ = {
  bedrooms: number;
  bathrooms: number;
  receptionRooms: number;
  furnishedStatus: FurnitureStatus;
  floorArea?: number | null;
  numberOfFloors: number;
  entranceLocation: "ground" | "lower" | "basement" | number;
  tenure: Tenure;
  environmentRating?: number | null;

  parking: Parking;
  outsideSpace: OutsideSpace;
  other: Other[];
};

type Parking =
  | "off-street"
  | "on-street"
  | "underground"
  | "driveway"
  | "single-garage"
  | "double-garage";
type OutsideSpace =
  | "back-garden"
  | "communal-garden"
  | "enclosed-garden"
  | "front-garden"
  | "private-garden"
  | "rear-garden"
  | "roof garden"
  | "balcony"
  | "terrace"
  | "patio";

type Price = {
  fullMarketPrice: number;
  deposit: number;
};

type AvailabilityStatus = {
  name: "Coming soon" | "For sale" | "Sale under offer" | "Sold";
  code: "coming-soon" | "available" | "under-offer" | "closed";
};
