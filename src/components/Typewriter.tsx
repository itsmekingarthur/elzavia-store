"use client";

import { useState, useEffect } from "react";

export default function Typewriter({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, started]);

  useEffect(() => {
    if (!started || done) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text, done, started]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-[1em] bg-emerald-400/70 animate-pulse align-middle mr-0.5" />}
    </span>
  );
}
