"use server";

import { auth } from "@clerk/nextjs";
import { fetchMutation, fetchQuery } from "convex/nextjs";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

const addToFavourties = async (formData: FormData) => {
  const propertyId = formData.get(
    "add-property-to-favourites-btn"
  ) as Id<"properties">;

  if (!propertyId) return "Invalid operation";

  const { userId, getToken } = auth();
  if (!userId) return "Signin to favourite this listing";

  const token = await getToken({ template: "convex" });
  if (!token) return "Feature access unavailable";

  // Convex | Fetch Query
  const { getUser } = api.users.queries;
  const { addToFavourites, removeFromFavourites } = api.users.mutations;

  const user = await fetchQuery(getUser, { user_id: userId }, { token });

  if (user && user.role === "user") {
    if (user.favourites === null)
      return "Signin or create an account to favourite listings";

    const mutation = !user.favourites.includes(propertyId)
      ? addToFavourites
      : removeFromFavourites;

    const args = {
      _id: user._id,
      property_id: propertyId,
      list: user.favourites,
    };

    // Response message
    return fetchMutation(mutation, args, { token });
  }

  return !userId || user?.role === "estate-agent"
    ? "Signin to favourite this listing"
    : "Listing added to favourties";
};

export default addToFavourties;
