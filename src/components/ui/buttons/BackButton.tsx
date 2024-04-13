"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import CloseIcon from "@mui/icons-material/Close";

type BackButtonProps = {
  icon: "arrow" | "cross";
  children?: React.ReactNode;
  onClick: () => void;
};

const BackButton = ({ children, onClick, icon }: BackButtonProps) => {
  const Icon =
    icon === "arrow" ? (
      <ForwardOutlinedIcon sx={{ rotate: "180deg", pointerEvents: "none" }} />
    ) : (
      <CloseIcon sx={{ pointerEvents: "none" }} />
    );

  return (
    <Card elevation={6}>
      <Button sx={{ gap: 1, display: "flex", padding: 2 }} onClick={onClick}>
        {Icon}{" "}
        {children ? (
          <Typography variant="body2" sx={{ pointerEvents: "none" }}>
            {children}
          </Typography>
        ) : null}
      </Button>
    </Card>
  );
};

export default BackButton;
