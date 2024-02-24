"use client";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Drawer from "@/components/mui/drawer/Drawer";
import DrawerHeader from "@/components/mui/drawer/DrawerHeader";

type MenuDrawerProps = {
  open: boolean;
  drawerWidth: number;
  children?: React.ReactNode;
  handleDrawerClose: () => void;
};

const MenuDrawer = (props: MenuDrawerProps) => {
  const { open, drawerWidth, children, handleDrawerClose } = props;
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open} width={drawerWidth}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      {children}
    </Drawer>
  );
};

export default MenuDrawer;
