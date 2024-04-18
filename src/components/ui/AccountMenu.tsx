"use client";

import NextLink from "next/link";
import { Fragment, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserProfile,
} from "@clerk/nextjs";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import PersonAdd from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WysiwygTwoToneIcon from "@mui/icons-material/WysiwygTwoTone";

type AccountMenuProps = {
  variant?: boolean;
  userName?: string;
  role?: string | null;
};

const AccountMenu = (props: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { maxWidth: "100%", overflow: "hidden" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 4,
            py: 1,
            borderBottom: "1px solid rgba(0, 0, 0, 0.16)",
          }}
        >
          <Typography variant="h6" sx={{ px: 1 }}>
            Account
          </Typography>
          <IconButton
            onClick={handleCloseDialog}
            aria-label="close account dialog"
            sx={{
              width: "fit-content",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <UserProfile
          appearance={{
            elements: {
              rootBox: { overflowY: "scroll" },
              card: { margin: 0, borderRadius: 0 },
            },
          }}
        />
      </Dialog>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title={
            props.variant ? "Menu" : props.role ? "Account settings" : "Sign-in"
          }
        >
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: props.role ? "purple" : "",
              }}
            >
              {!props.userName ? "C" : props.userName.slice(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {props.variant ? (
          <Box>
            <MenuItem href="/" component={NextLink}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              Home
            </MenuItem>

            <Divider />

            <MenuItem href="/properties" component={NextLink}>
              <ListItemIcon>
                <HomeWorkIcon fontSize="small" />
              </ListItemIcon>
              Properties
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <SignedIn>
              <MenuItem onClick={() => setOpenDialog(true)}>
                <Avatar /> Account
              </MenuItem>

              {props.role === "agent" ? (
                <MenuItem href="/dashboard" component={NextLink}>
                  <Avatar>
                    <WysiwygTwoToneIcon />
                  </Avatar>
                  Dashboard
                </MenuItem>
              ) : null}

              {props.role === "user" ? (
                <MenuItem href="/user/favourites" component={NextLink}>
                  <Avatar>
                    <FavoriteIcon />
                  </Avatar>
                  Favourites
                </MenuItem>
              ) : null}
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <MenuItem>
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  Sign-in
                </MenuItem>
              </SignInButton>
            </SignedOut>

            <Divider />

            <MenuItem href="/" component={NextLink}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              Home
            </MenuItem>

            <MenuItem href="/properties" component={NextLink}>
              <ListItemIcon>
                <HomeWorkIcon fontSize="small" />
              </ListItemIcon>
              Properties
            </MenuItem>

            <SignedIn>
              {props.role === "agent" ? (
                <MenuItem href={`/estate-agents/${""}`} component={NextLink}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Branch profile
                </MenuItem>
              ) : null}

              <SignOutButton>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign-out
                </MenuItem>
              </SignOutButton>
            </SignedIn>
          </Box>
        )}
      </Menu>
    </Fragment>
  );
};

export default AccountMenu;
