import List from "@mui/material/List";
import React from "react";

type FlexListProps = {
  children?: React.ReactNode;
  gap?: React.CSSProperties["gap"];
  flexWrap?: React.CSSProperties["flexWrap"];
  flexDirection?: React.CSSProperties["flexDirection"];
};

const FlexList = ({
  children,
  gap,
  flexWrap,
  flexDirection,
}: FlexListProps) => {
  return (
    <List sx={{ gap, flexWrap, flexDirection, display: "flex" }}>
      {children}
    </List>
  );
};

export default FlexList;
