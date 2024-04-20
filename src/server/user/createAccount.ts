"use server";

import { api } from "@/../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";

import { fetchMutation, fetchQuery } from "convex/nextjs";

type NewAccount = {
  accountName: string | null;
  accountType: "standard" | "branch" | null;
  branchName?: string | null;
};

const createAccount = async (formData: FormData) => {
  const account = {
    name: formData.get("accountName") as unknown as string,
    type: formData.get("accountType") as keyof NewAccount["accountType"],
    branchName: formData.get("branchName") as keyof NewAccount["branchName"],
  };

  if (account.type !== "standard" && account.type !== "branch") return null;

  const { userId, getToken } = auth();

  const token = await getToken({ template: "convex" });
  if (!userId || !token) return null;

  const user = await fetchQuery(
    api.users.queries.getUser,
    { user_id: userId },
    { token }
  );

  if ((user && user.role === "user") || (user && user.user_id))
    return {
      error: "user",
      message: "User account already exists!",
    };

  if ((user && user.role === "agent") || (user && user.user_id))
    return {
      error: "agent",
      message: "User account already exists!",
    };

  // Account options
  const options = {
    user_id: userId,
    name: account.name,
    role: account.type === "branch" ? "agent" : "user",
  };

  // Add new user + account options
  const _id = await fetchMutation(api.users.mutations.createUser, options);

  // TODO | Branch Account
  // if (_id && account.name === "agent") createBranchAccount

  return !_id
    ? null
    : {
        error: null,
        message: `Welcome to Cazzle, ${account.name}!`,
      };
};

export default createAccount;
