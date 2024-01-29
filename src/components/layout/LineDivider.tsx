import { Box } from "@mui/material";

export default function LineDivider({ bgColor }: { bgColor?: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "0.05rem",
        margin: "0.2rem 0",
        backgroundColor: bgColor || "lightgrey",
      }}
    />
  );
}
