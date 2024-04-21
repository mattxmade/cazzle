"use server";

import { api } from "@/../convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { clerkClient } from "@clerk/nextjs";

import { getStatus } from "@/data/dbStatus";
import getSignedInUser from "./getUser";

const deleteAccount = async (formData: FormData) => {
  try {
    const user = await getSignedInUser();
    if (!user) return getStatus.credentials.invalid;

    // validate user exists
    const { getUser } = api.users.queries;
    const userDoc = await fetchQuery(
      getUser,
      { user_id: user.id },
      { token: user.token }
    );
    if (!userDoc) return getStatus.credentials.invalid;

    // delete user data from db
    const { deleteUser } = api.users.mutations;
    const response = fetchMutation(
      deleteUser,
      { user_id: userDoc._id },
      { token: user.token }
    );

    // clerk delete account
    await clerkClient.users.deleteUser(user.id);

    // response message ui feedback
    return response;
  } catch (error) {
    console.log(error);
    return getStatus.server.error;
  }
};

export default deleteAccount;
