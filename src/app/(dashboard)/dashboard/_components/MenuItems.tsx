"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";

type MenuItemsProps = {
  menuItems: { name: string; text: string; Icon: React.ReactNode }[];
  handleMenuItem: (name: string) => void;
};

const MenuItems = ({ menuItems, handleMenuItem }: MenuItemsProps) => {
  return (
    <List>
      {menuItems.map((menuItem, i) => (
        <Tooltip key={menuItem.name} title={menuItem.text} placement={"right"}>
          <ListItem disablePadding>
            <ListItemButton
              aria-label={menuItem.text.toLowerCase()}
              onClick={() => handleMenuItem(menuItem.name)}
            >
              <ListItemIcon>{menuItem.Icon}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default MenuItems;
