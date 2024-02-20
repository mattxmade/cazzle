"use client";

import React, { useState } from "react";

import Accordion, {
  AccordionProps,
  AccordionSlots,
} from "@mui/material/Accordion";

import AccordionSummary, {
  type AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

import AccordionDetails, {
  type AccordionDetailsProps,
} from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type MuiProps = {
  accordionProps?: AccordionProps;
  accordionSummaryProps?: AccordionSummaryProps;
  accordionDetailsProps?: AccordionDetailsProps;
};

type ConcertinaProps = {
  muiProps: MuiProps;
  children?: React.ReactNode;
};

const Concertina = (props: ConcertinaProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return <h2>Concertina</h2>;
};

export default Concertina;
