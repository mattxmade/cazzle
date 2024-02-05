"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type PrimaryGridProps = {
  component?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  constantElements: React.ReactNode;
  mediumAboveDisplayElements: React.ReactNode;
};

const PrimaryGrid = (props: PrimaryGridProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container component={props.component || "section"}>
      {matches ? (
        props.constantElements
      ) : (
        <>
          {props.constantElements}
          {props.mediumAboveDisplayElements}
        </>
      )}
    </Grid>
  );
};

export default PrimaryGrid;
