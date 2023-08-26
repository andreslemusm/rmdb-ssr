import { parse } from "marked";

const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });
const formatNumberAsCompactNumber = (value: number) =>
  numberFormatter.format(value);

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatNumberAsCurrency = (value: number) => moneyFormatter.format(value);

const languageFormatter = new Intl.DisplayNames("en", {
  type: "language",
});
const formatLangCodeAsLangName = (code: string) => languageFormatter.of(code);

const markdownFormatter = (markdown: string) => parse(markdown);

export {
  formatNumberAsCurrency,
  formatLangCodeAsLangName,
  formatNumberAsCompactNumber,
  markdownFormatter,
};
