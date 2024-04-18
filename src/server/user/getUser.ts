"use server";

import { auth } from "@clerk/nextjs";
import { api } from "@/../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { requireAuthentication } from "../permissions";

const getSignedInUser = async () => {
  if (!requireAuthentication()) return null;

  try {
    const { userId, getToken, user } = auth();
    if (!userId) return null;

    const token = await getToken({ template: "convex" });
    if (!token) return null;

    const { getUser } = api.users.queries;
    const currUser = await fetchQuery(getUser, { user_id: userId }, { token });

    return {
      id: userId,
      current: currUser,
      token,
    };
  } catch (error) {
    return null;
  }
};

export default getSignedInUser;
