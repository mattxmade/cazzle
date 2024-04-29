"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CardProps } from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import useToast from "@/components/ui/feedback/toast/useToast";
import addToFavourties from "@/server/user/addToFavourties";
import SubmitButton from "./SubmitButton";

type FavouritesFormProps = {
  listingId: string;
  isUserFavourite?: boolean;
  skipText?: boolean;
  elevation?: CardProps["elevation"];
  color?: React.CSSProperties["color"];
  borderRadius?: React.CSSProperties["borderRadius"];
};

const FavouritesForm = (props: FavouritesFormProps) => {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);

  const toastTools = useToast();
  const Toast = toastTools.Toast;

  const handleFormSubmit = async (formData: FormData) => {
    const response = await addToFavourties(formData);
    setResult(response);
    toastTools.handleOpen();

    // sync with server
    router.refresh();
  };

  const isUserFavourite = !result
    ? props.isUserFavourite ?? false
    : result === "Listing added to favourites"
    ? true
    : false;

  return (
    <>
      <Stack direction="row" alignItems="center">
        <form action={handleFormSubmit}>
          <SubmitButton
            listingId={props.listingId}
            isUserFavourite={isUserFavourite}
            color={props.color}
            elevation={props.elevation}
            borderRadius={props.borderRadius}
          />
        </form>

        {props.skipText ? null : (
          <Typography variant="body1" fontWeight={500}>
            Save
          </Typography>
        )}
      </Stack>

      {result ? (
        <Toast
          open={toastTools.open}
          message={result}
          handleClose={toastTools.handleClose}
        />
      ) : null}
    </>
  );
};

export default FavouritesForm;
