import MuiAppBar, { type AppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

type TAppBarProps = { width: number; open?: boolean } & AppBarProps;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<TAppBarProps>(({ theme, open, width }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBar;

// https://mui.com/material-ui/react-drawer/#mini-variant-drawer
