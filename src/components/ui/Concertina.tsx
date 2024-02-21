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
  accordionProps?: Partial<AccordionProps>;
  accordionSummaryProps?: AccordionSummaryProps;
  accordionDetailsProps?: AccordionDetailsProps;
};

type ConcertinaProps = {
  muiProps?: MuiProps;
  children?: React.ReactNode;
  summaryContent?: React.ReactNode;
};

const Concertina = (props: ConcertinaProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpansion}
      {...props.muiProps?.accordionProps}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...props.muiProps?.accordionSummaryProps}
      >
        {props.summaryContent}
      </AccordionSummary>

      <AccordionDetails {...props.muiProps?.accordionDetailsProps}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Concertina;
