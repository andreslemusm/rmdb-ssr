import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import posthog from "posthog-js";
import { StrictMode, startTransition } from "react";

if (process.env.NODE_ENV === "production") {
  posthog.init(window.ENV.POSTHOG_API_KEY, {
    api_host: "https://app.posthog.com",
  });
}

const hydrate = () =>
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  /*
   * Safari doesn't support requestIdleCallback
   * https://caniuse.com/requestidlecallback
   */
  window.setTimeout(hydrate, 1);
}
