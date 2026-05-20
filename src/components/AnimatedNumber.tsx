"use client";

import { useState, useEffect, useRef } from "react";

export default function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) {
      setDisplayed(value);
      return;
    }
    started.current = true;
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayed(value);
        clearInterval(interval);
      } else {
        setDisplayed(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value]);

  return <>{displayed}{suffix}</>;
}
