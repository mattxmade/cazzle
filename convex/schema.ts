import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...
  users: defineTable({
    user_id: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.null(), v.string()),
    favourites: v.union(v.null(), v.array(v.id("properties"))),
    creationDate: v.number(),
    modifiedDate: v.number(),
  }),

  agents: defineTable({
    agent_id: v.string(),
    name: v.string(),
    role: v.string(),
    user_id: v.string(),
    branch_id: v.optional(v.id("branches")),
  }),

  branches: defineTable({
    ad: v.union(v.object({ storageId: v.id("_storage") }), v.null()),
    addressNumber: v.union(v.float64(), v.null()),
    agent_ids: v.array(v.string()),
    banner: v.union(v.object({ storageId: v.id("_storage") }), v.null()),
    branch_id: v.string(),
    description: v.string(),
    email: v.string(),
    logo: v.union(v.object({ storageId: v.id("_storage") }), v.null()),
    name: v.string(),
    postcode: v.string(),
    listings: v.object({
      live: v.array(v.id("properties")),
      draft: v.array(v.id("properties")),
    }),
    slug: v.string(),
    street: v.string(),
    summary: v.string(),
    telephone: v.union(v.float64(), v.null()),
    town: v.string(),
    user_ids: v.array(v.string()),
    website: v.string(),
  }),

  properties: defineTable({
    availabilityStatus: v.string(),
    bathrooms: v.float64(),
    bedrooms: v.float64(),
    councilTaxBand: v.string(),
    creationDate: v.float64(),
    depositPercentage: v.float64(),
    depositValue: v.float64(),
    description: v.array(v.string()),
    displayAddress: v.string(),
    environmentRating: v.union(v.null(), v.string()),
    features: v.array(v.string()),
    floorArea: v.float64(),
    floorplanImages: v.array(v.any()),
    forSale: v.boolean(),
    fullMarketPrice: v.float64(),
    galleryImages: v.union(
      v.null(),
      v.array(v.object({ storageId: v.id("_storage") }))
    ),
    modifiedDate: v.float64(),
    name: v.string(),
    newBuild: v.boolean(),
    postcode: v.union(v.null(), v.string()),
    propertyType: v.object({
      code: v.string(),
      group: v.string(),
      name: v.string(),
    }),
    property_id: v.string(),
    slug: v.string(),
    street: v.string(),
    summary: v.string(),
    tenure: v.string(),
    town: v.string(),
    user_id: v.string(),
    draft: v.optional(v.boolean()),
  }),
});
