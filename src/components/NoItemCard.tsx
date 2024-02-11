import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";

type NoItemCardProps = {
  variant: "image" | "floorplan";
};

const layout: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center;",
};

const color = "darkcyan";

const NoItemCard = ({ variant }: NoItemCardProps) =>
  variant === "image" ? (
    <Stack
      position="absolute"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      sx={{ inset: 0, backgroundColor: "#dedee2" }}
    >
      <NoPhotographyOutlinedIcon sx={{ fontSize: 56, color: "darkgrey" }} />
    </Stack>
  ) : (
    <Box
      sx={{
        ...layout,
        height: 75,
        gap: 0.5,
        padding: 1,
        border: "1px dashed #dedee2",
        borderRadius: 1,
        backgroundColor: "#f2f3f4",
      }}
    >
      <SpaceDashboardOutlinedIcon sx={{ color }} />{" "}
      <Typography color={color}>No floorplan</Typography>
    </Box>
  );

export default NoItemCard;
