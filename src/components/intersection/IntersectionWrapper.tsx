"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "./useIntersection";

import Box, { BoxProps } from "@mui/material/Box";

type Props = {
  styles?: { default?: BoxProps["sx"]; intersecting?: BoxProps["sx"] };
  elements?: { beforeId?: string; afterId?: string };
  children?: React.ReactNode;
} & Omit<BoxProps, "ref">;

const IntersectionWrapper = (props: Props) => {
  const { elements, styles, children } = props;

  if (!elements) return <Box {...props}>{children}</Box>;

  const elementBeforeRef = useRef<HTMLElement | null>(null);
  const elementTargetRef = useRef<HTMLElement | null>(null);
  const elementAfterRef = useRef<HTMLElement | null>(null);

  const elementBeforeObserver = elements.beforeId ? useIntersection() : null;
  const elementAfterObserver = elements.afterId ? useIntersection() : null;

  const elementTargetObserver = useIntersection({
    root: elementTargetRef.current,
  });

  useEffect(() => {
    if (!document) return;

    if (elementBeforeObserver && elements.beforeId) {
      if (elementBeforeRef.current) return;

      elementBeforeRef.current = document.getElementById(elements.beforeId);
      elementBeforeObserver.ref(elementBeforeRef.current);
    }

    if (elementAfterObserver && elements.afterId) {
      if (elementAfterRef.current) return;

      elementAfterRef.current = document.getElementById(elements.afterId);
      elementAfterObserver.ref(elementAfterRef.current);
    }
  }, []);

  const [style, setStyle] = useState<BoxProps["sx"]>();

  useEffect(() => {
    if (!elementTargetObserver) return;
  }, [elementTargetObserver.entry]);

  useEffect(() => {
    if (!elementBeforeObserver) return;

    elementBeforeObserver.entry?.isIntersecting
      ? setStyle({ ...styles?.default })
      : setStyle({ ...styles?.intersecting });
  }, [elementBeforeObserver?.entry]);

  useEffect(() => {
    if (!elementAfterObserver) return;
  }, [elementAfterObserver?.entry]);

  return (
    <Box {...props} ref={elementTargetObserver.ref} sx={{ ...style }}>
      {children}
    </Box>
  );
};

export default IntersectionWrapper;
