import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type MenuItemsProps = {
  menuItems: { name: string; text: string; icon: string }[];
  handleMenuItem: (name: string) => void;
};

const MenuItems = ({ menuItems, handleMenuItem }: MenuItemsProps) => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary={"Menu Item"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MenuItems;
