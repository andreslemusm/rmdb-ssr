import { HydratedRouter } from "react-router/dom";
import { hydrateRoot } from "react-dom/client";
import { StrictMode, startTransition } from "react";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
