import { createTrickling } from "trickling";

export const globalLoadingBar = createTrickling({
  easing: "linear",
  minimum: 0.1,
  showSpinner: false,
  trickleSpeed: 100,
  // 5px
  progressBarHeight: "0.3125rem",
  // Neutral 50
  color: "#FAFAFA",
});
