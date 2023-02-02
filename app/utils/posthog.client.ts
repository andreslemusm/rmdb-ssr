import posthog from "posthog-js";

export const setupPostHog = () => {
  if (process.env.NODE_ENV === "production") {
    posthog.init(window.ENV.POSTHOG_API_KEY);
  }
};
