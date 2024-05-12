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

    const listingItem = await ctx.db.get(args.listing_id);

    if (!listingItem) {
      // new user_id here
      // listing no longer available
    }

    return await ctx.db.get(args.listing_id);
  },
});

export const getUserFavourites = query({
  args: { favourites: v.array(v.id("properties")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return Promise.all(
      args.favourites.map(async (listing_id) => await ctx.db.get(listing_id))
    );
  },
});
