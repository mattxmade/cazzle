"use client";

import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Popper } from "@mui/base/Popper";

type InfoButtonProps = {
  ariaLabel: string;
  children?: React.ReactNode;
};

const InfoButton = ({ ariaLabel, children }: InfoButtonProps) => {
  const buttonRef = useRef(null);
  const anchorRef = useRef(null);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!children) return;

    if (buttonRef.current && !anchorRef.current) {
      anchorRef.current = buttonRef.current;
    }

    switch (e.type) {
      case "click":
        setButtonClicked(true);
        setDisplayMessage(true);
        break;

      case "mouseover":
        !displayMessage && setDisplayMessage(true);
        break;

      case "mouseout":
        buttonClicked === false && setDisplayMessage(false);
        break;
    }
  };

  const handleWindowClickEvent = (e: MouseEvent) => {
    if (!children) return;

    if (e.target !== buttonRef.current) {
      setButtonClicked(false);
      setDisplayMessage(false);
    }
  };

  useEffect(() => {
    window && window.addEventListener("click", handleWindowClickEvent);

    // Clean up function | prevent multiple event listeners
    return () => {
      window.addEventListener("click", handleWindowClickEvent);
    };
  }, []);

  const styles = {
    minWidth: 0,
    padding: 0,
    position: "relative",
    borderRadius: "100%",
  };

  return (
    <>
      <Box sx={styles}>
        <Button
          ref={buttonRef}
          aria-label={ariaLabel}
          sx={{ ...styles, inset: 0, position: "absolute" }}
          onClick={handleEvent}
          onMouseOver={handleEvent}
          onMouseOut={handleEvent}
        />
        <InfoIcon fontSize="small" sx={{ color: "grey" }} />

        {buttonClicked || displayMessage ? (
          <Popper open={true} anchorEl={anchorRef.current} placement="auto">
            {children}
          </Popper>
        ) : null}
      </Box>
    </>
  );
};

export default InfoButton;
