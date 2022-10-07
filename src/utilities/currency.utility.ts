let currencyFormat = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const numberToCurrency = (value: number) => {
  return currencyFormat.format(value);
};
