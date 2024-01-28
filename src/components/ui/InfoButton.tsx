"use client";

import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/InfoOutlined";

type InfoButtonProps = {
  ariaLabel: string;
};

const InfoButton = ({ ariaLabel }: InfoButtonProps) => (
  <Button
    sx={{ minWidth: 0, padding: 0, borderRadius: "100%" }}
    aria-label={ariaLabel}
  >
    <InfoIcon fontSize="small" sx={{ color: "grey" }} />
  </Button>
);

export default InfoButton;
