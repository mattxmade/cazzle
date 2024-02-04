import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ViewQuiltTwoToneIcon from "@mui/icons-material/ViewQuiltTwoTone";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";

type Props = {
  color: React.CSSProperties["color"];
  imageCount: number;
  imageIndex: number;
  videoCount: number;
  floorplanCount: number;
};

const CardIcons = (props: Props) => {
  <Stack direction="row" alignItems="center" spacing={0.5}>
    {props.floorplanCount ? (
      <>
        <ViewQuiltTwoToneIcon fontSize={"small"} sx={{ color: props.color }} />
        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
          sx={{ backgroundColor: props.color }}
        />
      </>
    ) : null}
    <Stack spacing={0.5} direction="row" justifyContent="space-between">
      <CameraAltIcon fontSize={"small"} sx={{ color: props.color }} />
      <Typography fontSize={"small"} sx={{ color: props.color }}>
        {props.imageIndex}/{props.imageCount}
      </Typography>
    </Stack>
  </Stack>;
};

export default CardIcons;
