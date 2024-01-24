import { ConvexHttpClient } from "convex/browser";
import { api } from "@/../convex/_generated/api";

type PropertyPageParams = {
  params: { propertyId: string };
};

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function PropertyPage({ params }: PropertyPageParams) {
  const property = await convex.query(api.properties.queries.getProperty, {
    name: params.propertyId,
  });

  return !property ? null : (
    <div>
      <h1>Property Page</h1>
      <p key={property.propertyId}>{property.propertyDetails.name}</p>
    </div>
  );
}
