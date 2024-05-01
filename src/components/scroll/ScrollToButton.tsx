"use client";

import Button, { ButtonProps } from "@mui/material/Button";

type Props = {
  containerId: string;
} & ButtonProps;

const ScrollToButton = ({ containerId, children, ...props }: Props) => {
  const handleScrollToElement = () => {
    if (!document || !window) return;

    const element = document.getElementById(containerId) as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    window.scrollTo({
      top: rect.top,
      left: rect.left,
      behavior: "smooth",
    });
  };

  return (
    <Button onClick={handleScrollToElement} {...props}>
      {children}
    </Button>
  );
};

export default ScrollToButton;
