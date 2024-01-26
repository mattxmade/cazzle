import { redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Dashboard from "./_components/Dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>

      <SignedOut>{redirect("/")}</SignedOut>
    </>
  );
}
