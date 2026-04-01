import { createTrickling } from "trickling"

export const globalLoadingBar = createTrickling({
  color: "var(--color-neutral-50)",
  easing: "linear",
  minimum: 0.1,
  progressBarHeight: " calc(var(--spacing))",
  showSpinner: false,
  trickleSpeed: 100,
})
