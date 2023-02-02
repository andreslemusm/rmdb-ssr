import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { setupPostHog } from "./utils/posthog";
import { StrictMode, startTransition } from "react";

setupPostHog();

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
