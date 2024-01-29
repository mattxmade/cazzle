import ListItem from "@mui/material/ListItem";

type FlexListItemProps = {
  children?: React.ReactNode;
  width?: React.CSSProperties["width"];
  padding?: React.CSSProperties["padding"];
};

const FlexListItem = ({ width, padding, children }: FlexListItemProps) => (
  <ListItem sx={{ width: width ?? "fit-content", padding: padding ?? 0 }}>
    {children}
  </ListItem>
);

export default FlexListItem;
