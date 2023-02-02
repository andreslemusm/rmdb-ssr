import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { StrictMode, startTransition } from "react";

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
