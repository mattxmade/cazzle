import { List } from "@mui/material";

type FlexListProps = {
  children: React.ReactNode;
  flexWrap: React.CSSProperties["flexWrap"];
  flexDirection: React.CSSProperties["flexDirection"];
};

const FlexList = ({ children, flexWrap, flexDirection }: FlexListProps) => {
  return (
    <List sx={{ display: "flex", flexWrap, flexDirection }}>{children}</List>
  );
};

export default FlexList;
