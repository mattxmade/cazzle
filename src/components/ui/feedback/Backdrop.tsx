import MuiBackdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
};

const Backdrop = ({ open }: Props) => {
  return (
    <MuiBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
