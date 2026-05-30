"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FB_PIXEL_ID } from "@/lib/fbpixel";

export default function FacebookPixel() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (!FB_PIXEL_ID || initialized.current) return;
    initialized.current = true;

    const f = window as any;
    if (f.fbq) return;

    f.fbq = function () {
      f.fbq.callMethod
        ? f.fbq.callMethod.apply(f.fbq, arguments)
        : f.fbq.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = f.fbq;
    f.fbq.push = f.fbq;
    f.fbq.loaded = !0;
    f.fbq.version = "2.0";
    f.fbq.queue = [];

    const s = document.createElement("script");
    s.async = !0;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    const fjs = document.getElementsByTagName("script")[0];
    fjs.parentNode?.insertBefore(s, fjs);

    f.fbq("init", FB_PIXEL_ID);
    f.fbq("track", "PageView");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [pathname]);

  if (!FB_PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
