"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import Button from "@mui/material/Button";
import Backdrop from "@/components/ui/feedback/Backdrop";

const DeleteAccountStatus = () => {
  const { pending } = useFormStatus();
  const [processing, setProcessing] = useState(false);

  pending && !processing && setProcessing(true);

  return (
    <>
      {processing ? <Backdrop open /> : null}

      <Button
        color="error"
        type="submit"
        variant="contained"
        aria-label="delete account"
        aria-disabled={processing}
        sx={{ width: 150, position: "absolute", right: 25, bottom: 8 }}
      >
        {!processing ? "Delete Account" : "Processing..."}
      </Button>
    </>
  );
};

export default DeleteAccountStatus;
