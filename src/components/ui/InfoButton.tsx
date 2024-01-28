"use client";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/InfoOutlined";

type InfoButtonProps = {
  ariaLabel: string;
  children?: React.ReactNode;
};

const InfoButton = ({ ariaLabel }: InfoButtonProps) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Button
        sx={{ minWidth: 0, padding: 0, borderRadius: "100%" }}
        aria-label={ariaLabel}
        onClick={handleEvent}
        onMouseOver={handleEvent}
        onMouseOut={handleEvent}
      >
        <InfoIcon fontSize="small" sx={{ color: "grey" }} />
      </Button>
    </>
  );
};

export default InfoButton;
