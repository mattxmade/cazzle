import Snackbar from "@mui/material/Snackbar/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent/SnackbarContent";

type ToastProps = {
  message: string;
  action: React.ReactNode;
  children?: typeof SnackbarContent;
};

const Toast = ({ message }: ToastProps) => {
  return (
    <Snackbar>
      <SnackbarContent message={message} />
    </Snackbar>
  );
};
export default Toast;
