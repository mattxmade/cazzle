import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";

const InfoButton = () => (
  <Button sx={{ minWidth: 0, padding: 0, borderRadius: "100%" }}>
    <InfoIcon fontSize="small" sx={{ color: "grey" }} />
  </Button>
);

export default InfoButton;
