import Snackbar from "@mui/material/Snackbar/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent/SnackbarContent";
import Slide, { SlideProps } from "@mui/material/Slide";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

type ToastProps = {
  open: boolean;
  message: string;
  action?: React.ReactNode;
  handleClose?: () => void;
  children?: React.ReactNode;
};

const Toast = (props: ToastProps) => {
  return (
    <Snackbar
      open={props.open}
      key={SlideTransition.name}
      onClose={props.handleClose}
      autoHideDuration={2200}
      TransitionComponent={SlideTransition}
    >
      {!props.children ? (
        <SnackbarContent message={props.message} />
      ) : (
        <>{props.children}</>
      )}
    </Snackbar>
  );
};

export default Toast;
