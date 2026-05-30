export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
  }
}

export const fbEvent = (name: string, options?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};
