import { forwardRef } from "react";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const SlideTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SlideTransition;

// Transition
// https://mui.com/material-ui/react-dialog/#full-screen-dialogs
