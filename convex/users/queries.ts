import { query } from "../_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("user_id"), args.user_id))
      .first();

    return user ?? null;
  },
});

export const getUserFavourite = query({
  args: { listing_id: v.id("properties") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db.get(args.listing_id);
  },
});
