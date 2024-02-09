import { useEffect, useRef } from "react";

type ElementDisplay = React.CSSProperties["display"];

const useHideElements = (elements: Array<keyof JSX.IntrinsicElements>) => {
  const displaySettingsRef = useRef<ElementDisplay[] | []>([]);
  const elementsRef = useRef<Array<HTMLElement | undefined> | null>(null);

  useEffect(() => {
    if (!document) return;
    [...new Array(elements.length)].map((_, i) => {
      const elNode = document.querySelector(elements[i]) as HTMLElement;

      if (!elNode) return;

      !displaySettingsRef.current.length
        ? (displaySettingsRef.current = [elNode.style.display])
        : (displaySettingsRef.current = [
            ...displaySettingsRef.current,
            elNode.style.display,
          ]);

      elNode.style.display = "none";
      return elNode;
    });

    return () => {
      if (!document || !elementsRef.current) return;

      if (!elementsRef.current.length || !displaySettingsRef.current.length)
        return;

      elementsRef.current.forEach((el, i) => {
        const displaySetting = displaySettingsRef.current[i];
        if (!el || !displaySetting) return;

        el.style.display = displaySetting;
      });
    };
  }, []);
};

export default useHideElements;
