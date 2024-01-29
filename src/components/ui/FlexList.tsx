import { List } from "@mui/material";

type FlexListProps = {
  children: React.ReactNode;
  flexWrap: React.CSSProperties["flexWrap"];
  flexDirection: React.CSSProperties["flexDirection"];
};

const FlexList = (props: FlexListProps) => {
  return <List sx={{ display: "flex" }}>{props.children}</List>;
};

export default FlexList;
