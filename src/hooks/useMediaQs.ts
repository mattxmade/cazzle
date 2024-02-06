import { useEffect, useRef, useState } from "react";

type useMediaQs = {
  mediaQueries: number[];
};

const useMediaQs = (params: useMediaQs) => {
  const mediaQs = useRef(
    [...new Array(params.mediaQueries.length)].map((mq, i) => {
      const modMq = `${params.mediaQueries[i]}px`;
      return modMq;
    })
  );
};

export default useMediaQs;
