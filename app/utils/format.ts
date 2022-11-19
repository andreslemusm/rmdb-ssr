const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatNumberAsCurrency = (value: number) => numberFormatter.format(value);

const languageFormatter = new Intl.DisplayNames("en", {
  type: "language",
});
const formatLangCodeAsLangName = (code: string) => languageFormatter.of(code);

export { formatNumberAsCurrency, formatLangCodeAsLangName };
