import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";

type PropertyPageParams = {
  params: { propertyId: string };
};

export const dyanmic = "force-dynamic";

export default async function PropertyPage({ params }: PropertyPageParams) {
  const property = await fetchQuery(api.properties.queries.getProperty, {
    name: params.propertyId,
  });

  return !property ? null : (
    <div>
      <h1>Property Page</h1>
      <p key={property.property_id}>{property.name}</p>
    </div>
  );
}
