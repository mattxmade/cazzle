import Box from "@mui/material/Box";

type FlexListProps = {
  children?: React.ReactNode;
  flexWrap?: React.CSSProperties["flexWrap"];
  flexDirection?: React.CSSProperties["flexDirection"];
};

const FlexList = ({ children, flexWrap, flexDirection }: FlexListProps) => {
  return (
    <Box component="ul" sx={{ display: "flex", flexWrap, flexDirection }}>
      {children}
    </Box>
  );
};

export default FlexList;
