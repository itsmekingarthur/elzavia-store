export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const initPixel = () => {
  if (!FB_PIXEL_ID || typeof window === "undefined") return;

  const w = window;
  w._fbq = w._fbq || [];
  const fbq = (...args: any[]) => {
    w._fbq.push(args);
  };
  if (!w._fbq.loaded) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    const f = document.getElementsByTagName("script")[0];
    f.parentNode?.insertBefore(s, f);
    w._fbq.loaded = true;
  }

  w._fbq.push(["init", FB_PIXEL_ID]);
  w._fbq.push(["track", "PageView"]);
};

export const fbEvent = (name: string, options?: Record<string, any>) => {
  if (typeof window === "undefined" || !window._fbq) return;
  window._fbq.push(["track", name, options]);
};
