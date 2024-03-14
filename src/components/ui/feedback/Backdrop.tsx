import MuiBackdrop, { BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
  backdropProps?: Partial<BackdropProps>;
};

const Backdrop = ({ open, backdropProps }: Props) => {
  return (
    <MuiBackdrop
      open={open}
      sx={{ ...backdropProps?.sx, color: "#fff", zIndex: 10000 }}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
