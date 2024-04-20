"use client";

import { useFormStatus } from "react-dom";

import Card from "@mui/material/Card/Card";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

type SubmitButtonProps = {
  listingId: string;
  isUserFavourite?: boolean;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={!pending ? "submit" : "button"}
      name="add-property-to-favourites-btn"
      aria-label="add to favourites"
      aria-disabled={pending}
      value={props.listingId}
      sx={{
        minWidth: 0,
        minHeight: 0,
        padding: 0.75,
        borderRadius: "100%",
      }}
    >
      <Card sx={{ lineHeight: 0, padding: 1, borderRadius: "100%" }}>
        {pending ? (
          <CircularProgress size={24} />
        ) : !props.isUserFavourite ? (
          <FavoriteBorderOutlinedIcon />
        ) : (
          <FavoriteOutlinedIcon sx={{ color: "red" }} />
        )}
      </Card>
    </Button>
  );
};

export default SubmitButton;
