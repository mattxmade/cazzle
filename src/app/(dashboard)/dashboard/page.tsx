import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";

import { api } from "@/../convex/_generated/api";
import getSignedInUser from "@/server/user/getUser";

import Dashboard from "./_components/Dashboard";
import { PropertyListing_ } from "@/types";
import { newForm } from "@/types/runtime";
import { checkPermission } from "@/server/permissions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  checkPermission();

  const user = await getSignedInUser();
  if (!user || !user?.current) redirect("/sign-in");

  const { getAgentByUserId } = api.agents.queries;

  const queryParams = { user_id: user.current.user_id };
  const queryOptions = { token: user.token };

  const estateAgent = await fetchQuery(
    getAgentByUserId,
    queryParams,
    queryOptions
  );
  if (!estateAgent) redirect("/sign-in");

  const { getAgentProperties } = api.agents.queries;
  const { getBranchProfile } = api.branches.queries;

  const properties = (await fetchQuery(
    getAgentProperties,
    queryParams,
    queryOptions
  )) as PropertyListing_[];

  const branch =
    estateAgent.branch_id &&
    (await fetchQuery(getBranchProfile, { branch_id: estateAgent.branch_id }));

  return (
    <Dashboard
      branch={branch ?? { ...newForm["branch"] }}
      properties={properties}
    />
  );
}
