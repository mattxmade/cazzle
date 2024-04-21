import { query } from "../_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("properties").collect();
  },
});

export const getPropertyById = query({
  args: { _id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});

export const getPropertyBySlug = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("properties")
      .filter((property) => property.eq(property.field("slug"), args.name))
      .first();
  },
});

export const getPropertyImage = query({
  args: { storageId: v.id("_storage") },

  handler: async (ctx, args) => {
    if (!args.storageId) return null;

    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getPropertyImages = query({
  args: {
    ImageIdList: v.array(v.object({ storageId: v.id("_storage") })),
  },

  handler: async (ctx, args) => {
    if (!args.ImageIdList) return null;

    return Promise.all(
      args.ImageIdList.map(async (item) => ({
        src: await ctx.storage.getUrl(item.storageId),
      }))
    );
  },
});
