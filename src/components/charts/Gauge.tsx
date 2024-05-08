import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { Gauge as MuiGauge, GaugeProps as MuiGaugeProps } from "@mui/x-charts";

type GaugeProps = {
  targetValue: number;
  lastValue: number;
} & Omit<MuiGaugeProps, "value">;

// const targetValue = 100;
// const lastValue = 50;

const Gauge = ({ lastValue, targetValue, children, ...props }: GaugeProps) => {
  const [mounted, setMounted] = useState(false);
  const [gaugeValue, setGaugeValue] = useState(lastValue);

  const gaugeElContRef = useRef<HTMLDivElement | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  if (mounted) {
    interval.current && clearInterval(interval.current);

    const min = props.valueMin ?? 0;
    const max = props.valueMax ?? 100;

    gaugeValue !== targetValue &&
      (interval.current = setInterval(() => {
        lastValue < targetValue
          ? setGaugeValue((prev) => +(prev += 1).toFixed(1))
          : setGaugeValue((prev) => +(prev -= 1).toFixed(1));
      }, 0));

    if (gaugeValue < min || gaugeValue > max) setGaugeValue(targetValue);

    if (gaugeValue > lastValue && gaugeValue > targetValue) {
      setGaugeValue(targetValue);
    }
  }

  useEffect(() => {
    !mounted && setMounted(true);

    // Component dismount cleanup function
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [mounted]);

  return (
    <Box ref={gaugeElContRef}>
      <MuiGauge {...props} value={gaugeValue} />
    </Box>
  );
};

export default Gauge;
