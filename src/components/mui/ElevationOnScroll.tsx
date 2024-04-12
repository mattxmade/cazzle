"use client";

import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface ElevationScrollProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default ElevationScroll;

// https://mui.com/material-ui/react-app-bar/#elevate-app-bar
