import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type Params = { width: number; margin: number; reduce: boolean } & BoxProps;

const AdaptiveBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "reduce",
})<Params>(({ theme, reduce, width, margin }) => ({
  margin: 0,
  marginLeft: margin,
  width: `calc(100% - ${margin}px)`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(reduce && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AdaptiveBox;
