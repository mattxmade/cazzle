const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME ?? "";

const locations = [
  { text: "Location", value: "" },
  { text: "Heywood", value: "heywood" },
  { text: "Pacifica", value: "pacifica" },
  { text: "Watson", value: "watson" },
  { text: "Westbrook", value: "westbrook" },
];
const prices = [
  { value: "50000", text: "£50,000" },
  { value: "60000", text: "£60,000" },
  { value: "70000", text: "£70,000" },
  { value: "80000", text: "£80,000" },
  { value: "90000", text: "£90,000" },
  { value: "100000", text: "£100,000" },
  { value: "110000", text: "£110,000" },
  { value: "120000", text: "£120,000" },
  { value: "125000", text: "£125,000" },
  { value: "130000", text: "£130,000" },
  { value: "140000", text: "£140,000" },
  { value: "150000", text: "£150,000" },
  { value: "160000", text: "£160,000" },
  { value: "170000", text: "£170,000" },
  { value: "175000", text: "£175,000" },
  { value: "180000", text: "£180,000" },
  { value: "190000", text: "£190,000" },
  { value: "200000", text: "£200,000" },
  { value: "210000", text: "£210,000" },
  { value: "220000", text: "£220,000" },
  { value: "230000", text: "£230,000" },
  { value: "240000", text: "£240,000" },
  { value: "250000", text: "£250,000" },
  { value: "260000", text: "£260,000" },
  { value: "270000", text: "£270,000" },
  { value: "280000", text: "£280,000" },
  { value: "290000", text: "£290,000" },
  { value: "300000", text: "£300,000" },
  { value: "325000", text: "£325,000" },
  { value: "350000", text: "£350,000" },
  { value: "375000", text: "£375,000" },
  { value: "400000", text: "£400,000" },
  { value: "425000", text: "£425,000" },
  { value: "450000", text: "£450,000" },
  { value: "475000", text: "£475,000" },
  { value: "500000", text: "£500,000" },
  { value: "550000", text: "£550,000" },
  { value: "600000", text: "£600,000" },
  { value: "650000", text: "£650,000" },
  { value: "700000", text: "£700,000" },
  { value: "800000", text: "£800,000" },
  { value: "900000", text: "£900,000" },
  { value: "1000000", text: "£1,000,000" },
  { value: "1250000", text: "£1,250,000" },
  { value: "1500000", text: "£1,500,000" },
  { value: "1750000", text: "£1,750,000" },
  { value: "2000000", text: "£2,000,000" },
  { value: "2500000", text: "£2,500,000" },
  { value: "3000000", text: "£3,000,000" },
  { value: "4000000", text: "£4,000,000" },
  { value: "5000000", text: "£5,000,000" },
  { value: "7500000", text: "£7,500,000" },
  { value: "10000000", text: "£10,000,000" },
  { value: "15000000", text: "£15,000,000" },
  { value: "20000000", text: "£20,000,000" },
];

const bedrooms = [
  { value: "1", text: "1 Bed" },
  { value: "2", text: "2 Bed" },
  { value: "3", text: "3 Bed" },
  { value: "4", text: "4 Bed" },
  { value: "5", text: "5 Bed" },
  { value: "6", text: "6 Bed" },
  { value: "7", text: "7 Bed" },
  { value: "8", text: "8 Bed" },
  { value: "9", text: "9 Bed" },
  { value: "10", text: "10 Bed" },
];

const propertyType = [
  { text: "Flat", value: "flat" },
  { text: "House", value: "house" },
  { text: "Detached house", value: "detached-house" },
  { text: "Semi-detached house", value: "semi-detached-house" },
  { text: "Terraced house", value: "terraced-house" },

  { text: "Bungalow", value: "bungalow" },
  { text: "Land", value: "land" },
  { text: "Park Home", value: "park-home" },
];

const tenure = [
  { text: "Leasehold", value: "leasehold" },
  { text: "Freehold", value: "freehold" },
  { text: "Commonhold", value: "commonhold" },
];

const availabilityStatus = [
  { text: "Available", value: "available" },
  { text: "Closed", value: "closed" },
  { text: "Coming-soon", value: "coming-soon" },
];

const councilTaxBand = [
  { text: "A", value: "A" },
  { text: "B", value: "B" },
  { text: "C", value: "C" },
  { text: "D", value: "D" },
  { text: "E", value: "E" },
  { text: "F", value: "F" },
  { text: "G", value: "G" },
  { text: "H", value: "H" },
];

export const content = {
  project: {
    author: process.env.NEXT_PUBLIC_AUTHOR ?? "",
    link: process.env.NEXT_PUBLIC_LINK ?? "",
    name: projectName,
    description: process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ?? "",
  },
  header: {
    heading: projectName,
    subheading: "",
    logo: "",
  },
  navBarItems: [
    { name: "home", slug: "/" },
    { name: "properties", slug: "/properties" },
  ],
  hero: {
    heading: `Your home, your ${projectName}`,
    image: "",
  },
  search: {
    filters: {
      locations,
      prices,
      bedrooms,
      propertyType,
    },
  },
};
