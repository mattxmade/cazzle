const paths = ["/dashboard", "/sign-in"];

export const isIgnoredPath = (path: string) =>
  paths.includes(path) || path.includes("/media");
