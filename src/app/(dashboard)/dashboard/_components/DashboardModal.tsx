"use client";

import DialogContent, {
  type DialogContentProps,
} from "@mui/material/DialogContent/DialogContent";

import Dialog, { type DialogProps } from "@mui/material/Dialog";
import SlideTransition from "@/components/mui/transitions/SlideTransition";

import AppBar, { type AppBarProps } from "@mui/material/AppBar";
import Toolbar, { type ToolbarProps } from "@mui/material/Toolbar";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";

import Button, { type ButtonProps } from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { SvgIconProps } from "@mui/material";

type MuiProps = {
  dialogProps: DialogProps;
  dialogContent?: DialogContentProps;
  appBarProps?: AppBarProps;
  toolbarProps?: ToolbarProps;
  buttonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
  svgIconProps?: SvgIconProps;
  typographyProps?: TypographyProps;
};

type DashboardModalProps = {
  title?: string;
  children?: React.ReactNode;
  muiProps: MuiProps;
  handleCloseModal: () => void;
};

const DashboardModal = (props: DashboardModalProps) => {
  const { title, children, handleCloseModal } = props;

  return (
    <Dialog
      fullScreen
      onClose={handleCloseModal}
      TransitionComponent={SlideTransition}
      {...props.muiProps?.dialogProps}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar {...props.muiProps?.toolbarProps}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseModal}
            aria-label={title ? `close ${title} editor modal` : "close modal"}
            {...props.muiProps?.iconButtonProps}
          >
            <CloseIcon {...props.muiProps?.svgIconProps} />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
            {...props.muiProps?.typographyProps}
          >
            {title ? title + " Editor" : "Modal"}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={handleCloseModal}
            {...props.muiProps?.buttonProps}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent {...props.muiProps?.dialogContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
