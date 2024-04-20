import { redirect } from "next/navigation";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import type { PropertyListing_ } from "@/types";
import MediaGallery from "@/components/layout/MediaGallery";

type MediaPageParams = {
  params: { propertyId: string };
  searchParams: { media: string };
};

export default async function MediaPage(props: MediaPageParams) {
  const { params, searchParams } = props;

  // Db query
  const query = api.properties.queries.getPropertyBySlug;

  const property = (await fetchQuery(query, {
    name: params.propertyId,
  })) as PropertyListing_;

  if (!property) return redirect("/not-found");

  const imageData = await fetchQuery(api.properties.queries.getPropertyImages, {
    ImageIdList: property.galleryImages as { storageId: Id<"_storage"> }[],
  });

  if (!imageData) return redirect("/not-found");

  // initial media item to display ( origin from listing page thumbnails )
  const item = searchParams.media ? Number(searchParams.media) : 0;

  return <MediaGallery mediaData={imageData} initItem={item} />;
}
