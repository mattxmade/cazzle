import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertProps = {
  open: boolean;
  title: string;
  desc?: string;
  handleClose: () => void;
  children: React.ReactNode;
};

const AlertDialog = (props: AlertProps) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.desc ? (
            <DialogContentText id="alert-dialog-description">
              {props.desc}
            </DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>{props.children}</DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
