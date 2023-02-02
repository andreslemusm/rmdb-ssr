import posthog from "posthog-js";

export const setupPostHog = () => {
  posthog.init(window.ENV.POSTHOG_API_KEY, {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
    },
  });
};
