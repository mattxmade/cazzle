import Snackbar, { SnackbarProps } from "@mui/material/Snackbar/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent/SnackbarContent";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert, AlertProps } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

type ToastProps = {
  open: boolean;
  message: string;
  action?: React.ReactNode;
  handleClose?: () => void;
  children?: React.ReactNode;
  alertProps?: AlertProps;
  snackbarProps?: SnackbarProps;
};

const Toast = (props: ToastProps) => {
  return (
    <Snackbar
      open={props.open}
      key={SlideTransition.name}
      onClose={props.handleClose}
      autoHideDuration={2200}
      TransitionComponent={SlideTransition}
      {...props.snackbarProps}
    >
      {!props.children ? (
        <SnackbarContent message={props.message} />
      ) : (
        <Alert variant="filled" sx={{ width: "100%" }} {...props.alertProps}>
          {props.children}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Toast;
