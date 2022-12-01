import { ScrollRestoration, useLocation } from "@remix-run/react";

/**
 * Temporal workaround for {@link https://github.com/remix-run/remix/issues/2810 conditional scroll restoration}
 */
export const ConditionalScrollRestoration = () => {
  const location = useLocation();

  if (
    location.state != null &&
    typeof location.state === "object" &&
    (location.state as { scroll: boolean }).scroll === false
  ) {
    return null;
  }

  return <ScrollRestoration />;
};
