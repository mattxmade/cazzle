import { api } from "@/../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Id } from "@/../convex/_generated/dataModel";

import Image from "next/image";
import Box from "@mui/material/Box";

import NoItemCard from "@/components/NoItemCard";
import { PropertyListing_ } from "@/types";

type PropertyCardMediaProps = {
  galleryImages: PropertyListing_["galleryImages"];
};

const PropertyCardMedia = async ({ galleryImages }: PropertyCardMediaProps) => {
  const imageData = await fetchQuery(api.properties.queries.getPropertyImages, {
    ImageIdList: galleryImages as { storageId: Id<"_storage"> }[],
  });

  if (!imageData) return null;
  const image = imageData[0];

  return (
    <Box width={"inherit"} height={222} position="relative" overflow="hidden">
      {!image?.src ? (
        <NoItemCard variant="image" />
      ) : (
        <Image
          src={image.src}
          alt={"listing main image"} // image.alt
          fill
          style={{ objectFit: "cover", aspectRatio: "16/9" }}
        />
      )}
    </Box>
  );
};

export default PropertyCardMedia;
