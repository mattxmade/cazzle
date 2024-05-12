import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { type DbResponse, getStatus } from "@/data/dbStatus";

export const createUser = mutation({
  args: { user_id: v.string(), name: v.string(), role: v.string() },
  handler: async (ctx, args) => {
    const { user_id, name, role } = args;
    const date = Date.now();

    const _id = await ctx.db.insert("users", {
      user_id,
      name,
      role,
      favourites: role === "user" ? [] : null,
      creationDate: date,
      modifiedDate: date,
    });

    return _id;
  },
});

export const deleteUser = mutation({
  args: { user_id: v.id("users") },

  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return getStatus.permission.unauthorized;

      await ctx.db.delete(args.user_id);
      const result = await ctx.db.get(args.user_id);

      const { success, failure } = getStatus.delete;

      return !result ? success("account") : failure("account");
    } catch (error) {
      return getStatus.server.error;
    }
  },
});

export const updateUserRole = mutation({
  args: { user_id: v.id("users"), role: v.union(v.null(), v.string()) },

  handler: async (ctx, args) => {
    if (
      !args.user_id ||
      (args.role !== "user" && args.role !== "agent" && args.role !== null)
    )
      return null;

    if (!ctx.auth.getUserIdentity()) return;

    console.log(args.role);

    await ctx.db.patch(args.user_id, {
      modifiedDate: Date.now(),
      role: args.role,
    });

    const user = await ctx.db.get(args.user_id);
    return user?.role;
  },
});

export const addToFavourites = mutation({
  args: {
    _id: v.id("users"),
    property_id: v.id("properties"),
    list: v.array(v.id("properties")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return "Feature access unavailable";

    const isValid = await ctx.db.get(args.property_id);
    if (!isValid) return "Property not found";

    try {
      const timestamp = Date.now();

      await ctx.db.patch(args._id, {
        modifiedDate: timestamp,
        favourites: [...args.list, args.property_id],
      });

      return "Listing added to favourites";
    } catch (error) {
      return "Adding property to favourites list failed";
    }
  },
});

export const removeFromFavourites = mutation({
  args: {
    _id: v.id("users"),
    property_id: v.id("properties"),
    list: v.array(v.id("properties")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return "Feature access unavailable";

    const isValid = await ctx.db.get(args.property_id);
    if (!isValid) return "Property not found";

    try {
      const timestamp = Date.now();

      await ctx.db.patch(args._id, {
        modifiedDate: timestamp,
        favourites: args.list.filter((id) => id !== args.property_id),
      });

      return "Listing removed from favourites";
    } catch (error) {
      return "Removing property from favourites list failed";
    }
  },
});
