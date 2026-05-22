"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPixel, fbEvent, FB_PIXEL_ID } from "@/lib/fbpixel";

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    initPixel();
  }, []);

  useEffect(() => {
    fbEvent("PageView");
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
