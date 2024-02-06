"use client";

import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [currWidth, setCurrWidth] = useState<number>(0);

  const handleResizeChange = () => {
    window && setCurrWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResizeChange();
    window && window.addEventListener("resize", handleResizeChange);

    // clean up function | remove EventLis when unmounted
    return () => {
      window && window.removeEventListener("resize", handleResizeChange);
    };
  }, []);

  return {
    currWidth,
  };
};

export default useWindowWidth;
