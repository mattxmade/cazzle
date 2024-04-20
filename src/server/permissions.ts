import { redirect } from "next/navigation";

export const checkPermission = () =>
  !process.env.NEXT_PUBLIC_AUTH && redirect("/not-found");

export const requireAuthentication = () =>
  process.env.NEXT_PUBLIC_AUTH ? true : false;
